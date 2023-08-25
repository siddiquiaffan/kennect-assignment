import express from 'express';
import moment from 'moment';

const app = express();
const PORT = 3000;

app.use(express.json());

const units = {
    d: 'days',
    w: 'weeks',
    m: 'months',
    y: 'years'
}

app.get('/calendar', (req, res) => {
    let { operation, value, from, unit } = req.query;
    unit = unit ?? 'd';

    if (!operation || !value) {
        return res.status(400).json({ error: 'Missing parameters' });
    }

    let date;

    if (from) {
        date = moment(from, 'DD-MMM-YYYY');
        if (!date.isValid()) {
            return res.status(400).json({ error: 'Invalid from date format' });
        }
    } else {
        date = moment();
    }

    if (!unit || !units[unit])
        return res.status(400).json({ error: 'Invalid unit' });

    unit = units[unit];

    switch (operation) {
        case 'add':
            date.add(parseInt(value), unit);
            break;
        case 'subtract':
            date.subtract(parseInt(value), unit);
            break;
        default:
            return res.status(400).json({ error: 'Invalid operation' });
    }

    return res.json({ result: date.format('DD-MMM-YYYY') });
});

app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});

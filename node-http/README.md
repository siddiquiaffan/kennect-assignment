# Node + Express HTTP Server
------

You can use this rest api to perform various tasks regarding dates.

------
------
## How to run
```bash
npm install
node index.js
```

## Base Url Endpoint
```http://localhost:3000```

## Path to use
```/calendar```

## Query Params
```js
- operation: operation to perform (add | substract)

- value: The value you want to be added/substracted

- from: Starting date from when the calculation should be done (default = today)

- unit: The unit using which the operation shoul be performed (d | w | m | y) (default = d)
    ex: `http://localhost:3000/calendar?operation=substract&value=2&unit=w`
```
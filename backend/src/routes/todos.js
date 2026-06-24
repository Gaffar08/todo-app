const express = require("express");

const {
  PutCommand,
  ScanCommand,
  UpdateCommand,
  DeleteCommand
} = require("@aws-sdk/lib-dynamodb");

const { v4: uuidv4 } = require("uuid");

const docClient = require("../db");

const router = express.Router();

const TABLE = process.env.TABLE_NAME;

// GET ALL TODOS
router.get("/", async (req, res) => {

  try {

    const result = await docClient.send(
      new ScanCommand({
        TableName: TABLE
      })
    );

    res.json(result.Items || []);

  } catch (error) {

    console.error(error);

    res.status(500).json({
      error: "Failed to fetch todos"
    });

  }

});

// CREATE TODO
router.post("/", async (req, res) => {

  try {

    const item = {
      id: uuidv4(),
      value: req.body.value,
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString()
    };

    await docClient.send(
      new PutCommand({
        TableName: TABLE,
        Item: item
      })
    );

    res.status(201).json(item);

  } catch (error) {

    console.error(error);

    res.status(500).json({
      error: "Failed to create todo"
    });

  }

});

// UPDATE TODO
router.put("/:id", async (req, res) => {

  try {

    const result = await docClient.send(
      new UpdateCommand({
        TableName: TABLE,

        Key: {
          id: req.params.id
        },

        UpdateExpression:
          "set #val = :v, updatedAt = :u",

        ExpressionAttributeNames: {
          "#val": "value"
        },

        ExpressionAttributeValues: {
          ":v": req.body.value,
          ":u": new Date().toISOString()
        },

        ReturnValues: "ALL_NEW"
      })
    );

    res.json(result.Attributes);

  } catch (error) {

    console.error(error);

    res.status(500).json({
      error: "Failed to update todo"
    });

  }

});

// DELETE TODO
router.delete("/:id", async (req, res) => {

  try {

    await docClient.send(
      new DeleteCommand({
        TableName: TABLE,

        Key: {
          id: req.params.id
        }
      })
    );

    res.json({
      message: "Deleted successfully"
    });

  } catch (error) {

    console.error(error);

    res.status(500).json({
      error: "Failed to delete todo"
    });

  }

});

module.exports = router;
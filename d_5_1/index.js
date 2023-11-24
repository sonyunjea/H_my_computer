var express = require('express');
var app = express();
const bodyParser = require('body-parser');
app.use(bodyParser.urlencoded({ extended: true }));
app.set('view engine', 'ejs');
app.use(express.json());
app.listen(4000);
console.log('Server is listening on port 3000');


// spqlite 사용 해서 데이터 베이스 연결
const { Sequelize, DataTypes } = require('sequelize');
const sequelize = new Sequelize({
  dialect: 'sqlite',
  storage: 'database.sqlite'
});

const Comments = sequelize.define('Comments', {
  content: {
    type: DataTypes.STRING,
    allowNull: false //true 라면 빈칸 가능 
  },

}, {
});


(async () => {

  await Comments.sync();
  console.log("The table for the User model was just (re)created!");

})();


// index page
app.get('/', async function (req, res) {
  try {
    // Fetch comments from the database
    const comments = await Comments.findAll();

    // Render the 'index' template with the comments
    res.render('index', { comments: comments });
  } catch (error) {
    console.error('Error fetching comments:', error);
    res.status(500).send('Internal Server Error');
  }
});




// post방식
app.post('/create', async function (req, res) {
  try {
    const { content } = req.body;
    const jane = await Comments.create({ content: content });

    // Log the content of the created comment
    console.log("Jane's auto-generated ID:", jane.id);
    console.log("Jane's content:", jane.dataValues.content);

    res.redirect('/');
  } catch (error) {
    console.error('Error creating comment:', error);
    res.status(500).send('Internal Server Error');
  }
});

// update page
app.get('/update/:id', async function (req, res) {
  try {
    const commentId = req.params.id;

    // Fetch the comment by ID from the database
    const comment = await Comments.findByPk(commentId);

    if (comment) {
      // Render the 'update' template with the comment
      res.render('update', { comment: comment });
    } else {
      // Handle the case where the comment with the specified ID is not found
      res.status(404).send('Comment not found');
    }
  } catch (error) {
    console.error('Error fetching comment for update:', error);
    res.status(500).send('Internal Server Error');
  }
});

// post방식 for updating comments
app.post('/update/:id', async function (req, res) {
  try {
    const commentId = req.params.id;
    const updatedContent = req.body.updatedContent;

    // Find the comment by ID and update its content
    const updatedComment = await Comments.findByPk(commentId);
    if (updatedComment) {
      updatedComment.content = updatedContent;
      await updatedComment.save();

      // Redirect to the home page after the update
      res.redirect('/');
    } else {
      // Handle the case where the comment with the specified ID is not found
      res.status(404).send('Comment not found');
    }
  } catch (error) {
    console.error('Error updating comment:', error);
    res.status(500).send('Internal Server Error');
  }
});
// delete page
app.post('/delete/:id', async function (req, res) {
  try {
    const commentId = req.params.id;

    // Find the comment by ID and delete it
    const deletedComment = await Comments.findByPk(commentId);
    if (deletedComment) {
      await deletedComment.destroy();

      // Redirect to the home page after the deletion
      res.redirect('/');
    } else {
      // Handle the case where the comment with the specified ID is not found
      res.status(404).send('Comment not found');
    }
  } catch (error) {
    console.error('Error deleting comment:', error);
    res.status(500).send('Internal Server Error');
  }
});







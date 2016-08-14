# Final Project - Recipe-Sharing Site

### description
This website will allow users to share recipes with others by uploading new recipes with instructions and ingredients listed, viewing existing recipes, and keeping a list of favorite recipes.

### MVP
- login/signup
  - the user will be able to log in with an existing account or create a new one. Authentication is only required for favoriting recipes and uploading new ones
- create a new recipe (ingredients, and instructions)
  - a logged in user will have a navigation option to add a recipe. This will involve adding ingredients and adding instructions as steps
- list of all recipes
  - each will be displayed with the recipe name, keywords, and description
- view individual recipe
  - user can see the list of ingredients as bullet points and the instructions as a paragraph
- favorite recipes
  - the user can keep track of favorited (recommended) recipes, visible on their profile
- user profile shows user's recipes

#### serverside data
- users
- recipes
- favorites join table

#### later features
- recipes show how many times it has been favorited
- when adding recipe, user will also choose from several keywords, such as "breakfast" or "quick"
- filter recipes by keywords
- checklist of steps when "trying" a recipe
- when creating a new recipe, should be able to mark an ingredient as optional. Will be reflected when a user views list of ingredients
- allow user to upload photo for the recipe when creating new one
- when adding favorite, user can write comment and upload their own photo

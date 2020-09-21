# pokedex

## Objective

MVP:

Get Pokémon rendered on the screen
Have an individual Pokémon page for every single Pokémon
Ability to filter by generation

MVP+ :

On single page, ability to click for next and previous Pokémon in the Pokédex
On single page of Pokémon have different gen descriptions for them (other images?)
Give suggestions for counter Pokémon in individual games (either completely new page, or extend single Pokémon page)
Search bar on single and landing page?

## Tasks

    API
    Finalise API - https://pokeapi.co/
    Make API calls to Pokémon API through Insomnia to analyse it

    Design
    Create basic wireframe
    Decide colours

    Setup Project
    Create a repo on GITHUB with a readme file then clone in terminal
    Set up HTML Boiler Plate - and TITLE
    Set up Folder structure
    Create SRC folder, with JS and SASS inside it
    Connect JS file
    Set up mini express server
    Set up GULP (SASS & Nodemon)
    Minify CSS
    Minify and compile JS

    Tasks
    SASS - Set variables for colours
    SASS - Set variables for screen sizes (bp's)
    JS - request Pokémon data
    Append Pokemon in to DOM

## Problems

problem 1:
pokemon showing up in wrong order

why?
appending pokemon only after fetch was complete
fetch was taking a different amount of time to get a response from server for each pokemon
and so pokemon would only be appended after fetch was complete
which resulted in pokemon being appended in a different order

Solution:
decided to append the pokemon placeholder first BEFORE the fetch request was made
which in turn allowed all the pokemon to display in order.
append the information for the pokemon in to the already created Li's

problem 2:
API was updated as more language were added on to the Pokemon descriptions. My Pokedex app was displaying the pokemon descriptions in Spanish. 

Solution:
wrote a piece of code which would only return the last array in the array of descriptions. The last array was the description in the enlish language

## Future Plans 

Request 20 pokmeon initially, and only request more pokemon as you scroll down. This would be to increase user experience and speed. 

Also try and get Lazy Loading implemented. As the page can be quite slow to load. 

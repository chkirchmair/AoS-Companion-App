# User stories (and some thoughts about early implementations)

## Submitting the result of a battle

A user should be able to submit the result of a battle. The user is required to name the involved factions and the victor of the battle. Optionally they can select the region or hex tile which the battle has been fought in. Only regions or tiles that satisfy some criteria (e.g. being adjacent to tiles or regions that are controlled by at least one involved faction) can be selected. If no tile is selected, the system chooses an appropriate tile based on the location of the involved factions.

### Suggestions:

Should a submitted result be confirmed by an admin before its effects are resolved? Developing and (to a smaller degree) implementing a good algorithm to automatically choose a tile is probably difficult and time-consuming. In order to be able to start the campaign as soon as possible, it might be better to let admins decide where the battle has taken place. The algorithm could still be added later.

The easiest way to allow users to select a tile is to let them enter the coordinates of it (or the name of a region). A more advanced implementation could allow users to select tiles or regions by clicking on the campagin map. Similar, the easiest way to to display the tiles that users could select is by giving them a list of the corresponding tile coordinates.

## Showing the campaign map

The current state of the campaign map should be shown on the main page. It should be not necessary to be logged in to see the campaign map.

## Showing information of a tile (region)

Users should be able to get information of tiles (e.g. the faction controlling it, its coordinates, whether it is a POI or not, or even suggested features such as recommended terrain)

### Suggestions:

The probably easiest way to implement this is to give a list of types of terrain tiles (this assumes that each tile can be assigned a "type", like woodland, steppe, etc, which would be clearly recognizeable by just viewing at its visualisation) where the effect of each type is listed. A more advanced implementation would require that each tile (or region) could be selected (e.g. by clicking on it) to display information about it.

## Managing campaign news

Users should be able to get the latest news about the campaign, e. g. results of battles, territorial changes, available battles for POI, etc.

### Suggestion:

The simplest (and probably most visible) way of displaying news is by using our forum.

## Login

A user should be able to log in, which is necessary to enter the result of battles, but not necessary to view the campaign map.

## User Management

Admins should be able to create, update and delete users.

## Campaign map management

Admins should be able to create, edit and delete (should we really allow this?) campaign maps. 

## Tile Management

Admins should be able to manage tiles, like changing its controlling factions, editing its information, etc.
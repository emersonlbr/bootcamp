REST - a mapping between HTTP and CRUD (create, read, update, destroy)

RESTfull Routes

name                Path                  HTTP Verb                   Purpose
====================================================================================
INDEX               /dogs                    GET                       List all dogs
NEW                 /dogs/new                GET                       Show the new dog
CREATE              /dogs                    POST                      Create a new dog, then redirect somewhere
SHOW                /dogs:id                 GET                       Show info about one specific dog
EDIT                /dogs:id/edit            GET                       Show edit form for one dog
UPDATE              /dogs:id                 PUT                       Update a particular dog, then redirect somewhere
DESTROY             /dogs:id                 DELETE                    Delete a particular dog

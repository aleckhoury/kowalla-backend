# Kowalla API

### API Overview
```
This API is built using a standard structure of models, routes, and controllers.

The backend database is using MongoDB, with most items being tracked by storing IDs of two other objects,
such as the Subscription object, which would have a profileId to indicate what user subscribed, and a space or project ID
to indicate where they subscribed to. Models are built using Mongoose, and mongoose-unique-validator to enforce
the requirements placed on them.

Routes are organized by the areas that actions take place in, so for example you'll find the upvote
routes within the "comment_routes" file. There may be a few outliers, but most routes should follow
this standard.

The controllers are separated out and should mostly pertain to the action they're referring to, unless
a more complex user action is occurring.

**Hazards:**
- There may be lots of comments and code in here that hasn't been refined or removed. In the front-end, I've spent a
bit more time removing code that is no longer used, and doing cleanup along the way. The backend has not received
the same level of treatment. 
- There is no global error handling wrapper besides the wrapper for unauthorized requests,
so some functions are inconsistent in how they handle errors.
- Not to lay blame, but to lay a bit of blame, my former partner had some convoluted naming
conventions, so in some areas there may be some variable naming and function naming that isn't the most intuitive.
Webstorm should help with that, but it can still be annoying.

```
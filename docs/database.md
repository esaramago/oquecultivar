# Database

## Tables
You, Agent, can decide the best way to store the data, based on the [inderface.md](./interface.md) file, but here are some rules:

* 1 table for the cultures (name, variant, type (leguminosa, fruto, etc), id, slug)
* Information that is not changeable, like Months and Districts, should be stored in [config.ts](../src/lib/config.ts)
* Question: should actions (Sementeira direta, viveiro, Plantar and Colher) be stored in the config or in the database?
* Each culture has a set of actions, and each action has a set of months, and each month has a set of regions.
# Attach to Trello Card action prototype

This project is a prototype.  Please contact the author for more info, if interested.

This action looks for a Trello card URL in the start of a Pull Request description (a project using this action should have a workflow configured for `pull_request` event types to trigger use).  If a URL is found, it will push an attachment with the PR link to Trello (for use by [Trello Github Power-Up](https://trello.com/power-ups/55a5d916446f517774210004/github)), for trackability.

This requires Trello key+token to be supplied from workflow where used (minimally, the token should come from repo Secrets).  See action.yml for specific inputs/outputs.

# User Admin Portal Prototype

Goal: Create a user admin portal with an Undo + Redo system.

Requirements:
1. Users have the following information: First Name, Last Name, and Email.
2. Users can be created and deleted.
3. Each action should be "autosaving", ie. the backend (in this case just `ApiService.ts`) should be updated and kept in sync. Therefore, for undo we must roll back the local state as well as make the appropriate update in the remote state. Same for redo.
4. Undo/redo should work similarly to what we are all familiar with in other apps (and as it works in the text editor you are likely currently using!).
5. If a user creation is undone, if redone, the user should be recreated with the same user id.
6. Do NOT modify `ApiService.ts`

# IMPORTANT!!!
We have given you some very basic react components to get started.
We do not care about ugly UIs, this is not a challenge to create a pixel perfect UI.
We care MUCH more about the actual functionality, and ESPECIALLY the undo and redo.

Feel free to include other dependencies if you think they will be helpful.
However, do NOT include any dependencies to implement undo/redo.

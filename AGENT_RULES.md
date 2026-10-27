# Project Technical Rules & Coding Standards

## 1. File Length Constraint (Strict Rule)
- **NO file should exceed 50 lines of code**.
- Any file that approaches or exceeds 50 lines must be decomposed into smaller, focused, modular sub-components.
- Each sub-component must have its own dedicated CSS module file (`ComponentName.module.css`).
- The parent component folder must contain a `Components/` subfolder containing these sub-components.

## 2. Organization & Readability
- Code must be clean, highly organized, and easy to read, test, and edit.
- Keep JSX trees shallow by delegating chunks of UI into well-named child components.
- Do not mix complex styling or monolithic markup into a single file.

listen this's a very important system with a very sensitive data here in our project which needs a n entire page for it not just a floating modal like that because we don't want to risk losing a bit of this data so we need once the user leaves an input this input should be saved on the database along with also the local storage and on retrieve we should compare the data to choose the right one take in consideration the user may  assing an importer then their tare wights then exits to assing a new one may be in that exact moment another usser attempts to assign the previous importer so the data the latter user assigned should be there even if the 2 users are in the same importer page on should be a writer and the other should be previewer on real time data input change so we need to pefectly synchronize the data and for the tare wights or gross wieghts thery aare a very important sensitive data which should be managed correctly i mean for the gross wieghts they should be full as defualt and if the user chooses partially full or even extra full option they should say with how many chicks for calcs to be right.

the user should have the full ability to leave the page with uncompleted data but they've the ability to get it or retreive it they also can make it through another importer with breadcrump navigation

also for the vehicle type logic the same importer should has multiple vehicles saved on importers table or whatever so in this specific cycle we should know which vehicle he came with this ttime so we decide to add it as a new vehicle for this person or an already found vehicle so the user decides this 

we should go throough this with our technical constriants as before within the file @AGENT_RULES.md 
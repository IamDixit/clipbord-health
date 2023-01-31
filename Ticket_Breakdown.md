# Ticket Breakdown
We are a staffing company whose primary purpose is to book Agents at Shifts posted by Facilities on our platform. We're working on a new feature which will generate reports for our client Facilities containing info on how many hours each Agent worked in a given quarter by summing up every Shift they worked. Currently, this is how the process works:

- Data is saved in the database in the Facilities, Agents, and Shifts tables
- A function `getShiftsByFacility` is called with the Facility's id, returning all Shifts worked that quarter, including some metadata about the Agent assigned to each
- A function `generateReport` is then called with the list of Shifts. It converts them into a PDF which can be submitted by the Facility for compliance.

## You've been asked to work on a ticket. It reads:

**Currently, the id of each Agent on the reports we generate is their internal database id. We'd like to add the ability for Facilities to save their own custom ids for each Agent they work with and use that id when generating reports for them.**


Based on the information given, break this ticket down into 2-5 individual tickets to perform. Provide as much detail for each ticket as you can, including acceptance criteria, time/effort estimates, and implementation details. Feel free to make informed guesses about any unknown details - you can't guess "wrong".


You will be graded on the level of detail in each ticket, the clarity of the execution plan within and between tickets, and the intelligibility of your language. You don't need to be a native English speaker, but please proof-read your work.

## Your Breakdown Here

## TICKET-1: Create new table AgentFacilityMap 
### Database Task

> Description: Create a new table **AgentFacilityMap** that contains one to many relation between facility and agents. 

### Implementation Guide
1. The schema should contain these field:- (_id: <documentId>, facilityId: <Ref to facility schema>, agentId: <Ref to Agent schema>, customAgentId: <String, indexed: true>, createdOn: <Date>, updatedOn: <Date>)
2. Create db migration script to create the database schema
3. Migration sprint need to be executed in all the environment
4. Create a fallback script to delete the schema in case of failure while execution.

### Acceptance Criteria
1. Database update and fallback scripts should be in place
2. Unit test should be written

> Story Point (in hrs): 2.5hrs

## TICKET-2: Create PUT Endpoint to add custom agent ID
### Backend Task

> Description: Create a PUT endpoint `api/v1/agent/update-custom-agent-id/:agentId` which will have  **customAgentId: string** data in body params. This endpoint will be used by facilities to add custom user id for the agents.

### Implementation Guide
1. API authentication and user authorization need to be perform, in case of failure abort the execution and throw error with message `You are not authorized to perform this operation`.
2. The API body params need to be validated. The body must contain customAgentId having type as string and API should be having agentId
3. Validate if the Agent is connected with the facility using the authorization data, in case of failure abort the execution and throw error message `Not authorized to perform this operation`
4. Check if the AgentFacilityMap already have document with facilityId and agentId, if yes then update the customAgentId and updatedOn field, else
5. Write database insert query and add following data into AgentFacilityMap collection
    1. facilityId: string
    2. agentId: string
    3. customAgentId: string
    4. createdOn: new Date()
    5. updatedOn: new Date()
6. Return success message `Agent Id is added/updated successfully!`

### Acceptance Criteria
1. API response should be under 500ms
2. Error handling and messaging logging should be in place
3. Unit test should be written
4. API documentation should be added on swagger 

> Story Point (in hrs): 5hrs

## TICKET-3: Implement `getFacilityIdByCustomAgentId()` method in utils function
### Backend Task

> Description: Create getFacilityIdByCustomAgentId() method in the utils file which will accept **customAgentId** as params and provide the the list of all facilities which they are connected with. This facilityId will further be used by existing `getShiftsByFacility` method to get the shift and later reports can be generated via `generateReport` function.

### Implementation Guide
1. Method to get customAgentId: <string> as params
2. Database find query need to be executed and facilityId should be projected from the results
3. Same data should be returned and method response

### Acceptance Criteria
1. API response should be under 500ms
2. Error Handling and messaging logging should be in place
3. Unit test should be written

> Story Point (in hrs): 2hrs

## TICKET-4: Implement UI/UX and API integration to save/update custom agent Id
### Frontend Task

> Description: Create input-box with submit button to collect and update **customAgentId** and use the swagger document for API Integration

### Implementation Guide
1. Use the shared designs to implement the UI component
2. Complete the Error Handling

### Acceptance Criteria
1. Debounce before API call should be there
2. Unit test should be written

> Story Point (in hrs): 2hrs



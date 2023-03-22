# Trial Tracker

Trial Tracker is a trial management system for companies to manage their clinical trials. You can create/view/edit trials and also create/view/edit patients with customization on data inputs and visualization. 

## github repository
https://github.com/jbush93/Trial-Tracker

## Wireframe
insert image

## User Stories
1. A user can login with authenticated, password protection
2. A user can create a trial
3. A user can view their existing trials or a specific trial
4. Within a trial, a user can view trial information as well as patients associated with the trial
5. A user can edit a trial
6. A user can create a patient
7. A user can view their existing patients or a specific patient
8. Within a patient, a user can view patient information as well as the trial and conditions associated with the patient
9. A user can view notes for the patient's page
10. A user can create notes on the patient's page
11. A user can delete notes on the patient's page
12. A user can view measurements on the patient's page
13. A user can change which measurements are being displayed in the graph
14. A user can create measurements on the patient's page
15. A user can delete measurements on the patient's page
16. A user can edit a patient

## Backend
Here's a breakdown of the backend:
### Models
1. A Trial 
    has_many :patients 
    has_many :notes, through: :patients 
    has_many :measurements, through: :patients
    has_many :outcomes 
    has_many :arm_groups 
    has_many :locations 
    has_many :conditions
2. A Patient
    belongs_to :trial 
    has_many :conditions, through: :trial 
    has_many :notes
    has_many :measurements
3. A Condition
    belongs_to :trial 
    has_many :patients, through: :trial
4. An Outcome
    belongs_to :trial
5. A Note
    belongs_to :patient
6. A Measurement
    belongs_to :patient 
8. A Location
    belongs_to :trial 
10. An Arm Group
    belongs_to :trial
### Entity-Relationship Diagram (ERD)
insert image

### Model Validations

### API Endpoints
insert image

### Serializer Example
insert image of serializer

## Frontend
### React Client-Side Routing
insert image

### React Component Tree
insert image

## Technologies / Libraries / Packages
* Ruby
* Ruby on Rails
* will-paginate (gem)
* Bcrypt (gem)
* ActiveRecord
* React
* JavaScript
* D3 / Recharts
* Bootstrap CSS
* CSS

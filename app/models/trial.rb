class Trial < ApplicationRecord
    has_many :patients 
    has_many :notes, through: :patients
    has_many :outcomes 
    has_many :arm_groups 
    has_many :locations 
    has_many :conditions
end

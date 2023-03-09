class Patient < ApplicationRecord
    belongs_to :trial 
    has_many :conditions, through: :trial 
    has_many :notes
    
end

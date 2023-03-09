class Condition < ApplicationRecord
    belongs_to :trial 
    has_many :patients, through: :trial
    
end

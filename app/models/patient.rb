class Patient < ApplicationRecord
    belongs_to :trial 
    has_many :conditions, through: :trial 
    has_many :notes
    has_many :measurements
    has_many :documents

end

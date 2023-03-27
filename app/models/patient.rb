class Patient < ApplicationRecord
    belongs_to :trial 
    has_many :conditions, through: :trial 
    has_many :notes, dependent: :destroy
    has_many :measurements, dependent: :destroy
    has_many :documents, dependent: :destroy

end

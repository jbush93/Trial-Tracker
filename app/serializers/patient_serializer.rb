class PatientSerializer < ActiveModel::Serializer
  attributes :id, :trial_id, :first_name, :last_name, :address, :gender, :weight, :height, :age
  
  belongs_to :trial 
  has_many :conditions, through: :trial
  has_many :notes
  has_many :measurements
end

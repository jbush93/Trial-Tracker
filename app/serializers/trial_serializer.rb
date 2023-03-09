class TrialSerializer < ActiveModel::Serializer
  attributes :id, :NCTId, :organization_name, :brief_title, :official_title, :overall_status, :start_date, :primary_completion_date, :primary_completion_date_type, :lead_sponsor, :is_fda_regulated_drug, :is_fda_regulated_device, :brief_summary, :detailed_description, :study_type, :phase, :intervention_type, :intervention_description, :eligibility_criteria, :gender, :minimum_age, :contact_name, :contact_phone, :contact_email

  has_many :patients 
  has_many :outcomes 
  has_many :arm_groups 
  has_many :locations 
  has_many :conditions
  has_many :notes, through: :patients
end

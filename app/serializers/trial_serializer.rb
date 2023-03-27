class TrialSerializer < ActiveModel::Serializer
  attributes :id, :NCTId, :organization_name, :brief_title, :official_title, :overall_status, :start_date, :primary_completion_date, :primary_completion_date_type, :lead_sponsor, :is_fda_regulated_drug, :is_fda_regulated_device, :brief_summary, :detailed_description, :study_type, :phase, :intervention_type, :intervention_description, :eligibility_criteria, :gender, :minimum_age, :contact_name, :contact_phone, :contact_email, :patients, :patient_measurements
  
  has_many :outcomes 
  has_many :arm_groups 
  has_many :locations 
  has_many :conditions
  has_many :notes, through: :patients
  has_many :measurements, through: :patients

  def patient_measurements 
    object.measurements.map do |item|
      {
        first_name: item.patient.first_name,
        last_name: item.patient.last_name,
        gender: item.patient.gender,
        age: item.patient.age,
        weight: item.patient.weight,
        date: item.date,
        measurement: item.measurement,
        measurement_label: item.measurement_label,
        placebo_group: item.patient.placebo
      }
    end
  end
end
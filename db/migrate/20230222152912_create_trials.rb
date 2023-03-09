class CreateTrials < ActiveRecord::Migration[7.0]
  def change
    create_table :trials do |t|
      t.string :NCTId
      t.string :organization_name
      t.string :brief_title
      t.string :official_title
      t.string :overall_status
      t.string :start_date
      t.string :primary_completion_date
      t.string :primary_completion_date_type
      t.string :lead_sponsor
      t.string :is_fda_regulated_drug
      t.string :is_fda_regulated_device
      t.string :brief_summary
      t.string :detailed_description
      t.string :study_type
      t.string :phase
      t.string :intervention_type
      t.string :intervention_description
      t.string :eligibility_criteria
      t.string :gender
      t.integer :minimum_age
      t.string :study_population
      t.string :sampling_method
      t.string :contact_name
      t.string :contact_phone
      t.string :contact_email

      t.timestamps
    end
  end
end

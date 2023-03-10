class CreateMeasurements < ActiveRecord::Migration[7.0]
  def change
    create_table :measurements do |t|
      t.integer :patient_id
      t.date :date
      t.integer :measurement
      t.string :measurement_label

      t.timestamps
    end
  end
end

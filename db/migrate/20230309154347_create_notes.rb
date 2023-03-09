class CreateNotes < ActiveRecord::Migration[7.0]
  def change
    create_table :notes do |t|
      t.integer :patient_id
      t.date :date
      t.string :title
      t.string :description

      t.timestamps
    end
  end
end

class CreateDocuments < ActiveRecord::Migration[7.0]
  def change
    create_table :documents do |t|
      t.integer :patient_id
      t.string :title

      t.timestamps
    end
  end
end

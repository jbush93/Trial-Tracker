class CreatePatients < ActiveRecord::Migration[7.0]
  def change
    create_table :patients do |t|
      t.integer :trial_id
      t.string :first_name
      t.string :last_name
      t.string :address
      t.string :gender
      t.string :weight
      t.string :height
      t.string :age

      t.timestamps
    end
  end
end

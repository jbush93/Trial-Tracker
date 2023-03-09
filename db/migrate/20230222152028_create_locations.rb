class CreateLocations < ActiveRecord::Migration[7.0]
  def change
    create_table :locations do |t|
      t.integer :trial_id
      t.string :facility
      t.string :state
      t.string :zip
      t.string :country

      t.timestamps
    end
  end
end

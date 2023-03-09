class CreateConditions < ActiveRecord::Migration[7.0]
  def change
    create_table :conditions do |t|
      t.integer :trial_id
      t.string :condition

      t.timestamps
    end
  end
end

class CreateArmGroups < ActiveRecord::Migration[7.0]
  def change
    create_table :arm_groups do |t|
      t.integer :trial_id
      t.string :label
      t.string :type
      t.string :description
      t.string :intervention_name

      t.timestamps
    end
  end
end

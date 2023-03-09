class CreateOutcomes < ActiveRecord::Migration[7.0]
  def change
    create_table :outcomes do |t|
      t.integer :trial_id
      t.string :type
      t.string :outcome_measure
      t.string :outcome_description
      t.string :outcome_timeframe

      t.timestamps
    end
  end
end

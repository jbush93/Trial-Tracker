class AddColumnToPatient < ActiveRecord::Migration[7.0]
  def change
    add_column :patients, :placebo, :boolean
  end
end

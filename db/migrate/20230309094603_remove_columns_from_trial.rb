class RemoveColumnsFromTrial < ActiveRecord::Migration[7.0]
  def change
    remove_column :trials, :study_population, :string
    remove_column :trials, :sampling_method, :string
  end
end

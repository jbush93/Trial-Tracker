class RemoveColumnFromUsers < ActiveRecord::Migration[7.0]
  def change
    remove_column :users, :document, :string if column_exists?(:users, :document)
  end
end

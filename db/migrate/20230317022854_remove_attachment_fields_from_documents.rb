class RemoveAttachmentFieldsFromDocuments < ActiveRecord::Migration[7.0]
  def change
    remove_column :documents, :attachment_file_name, :string if column_exists?(:documents, :attachment_file_name)
    remove_column :documents, :attachment_content_type, :string if column_exists?(:documents, :attachment_content_type)
    remove_column :documents, :attachment_file_size, :integer if column_exists?(:documents, :attachment_file_size)
    remove_column :documents, :attachment_updated_at, :datetime if column_exists?(:documents, :attachment_updated_at)
  end
end

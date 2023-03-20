class RemoveAttachmentFieldsFromDocuments < ActiveRecord::Migration[7.0]
  def change
    remove_column :documents, :attachment_file_name, :string
    remove_column :documents, :attachment_content_type, :string
    remove_column :documents, :attachment_file_size, :integer
    remove_column :documents, :attachment_updated_at, :datetime
  end
end

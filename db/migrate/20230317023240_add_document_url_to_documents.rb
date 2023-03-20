class AddDocumentUrlToDocuments < ActiveRecord::Migration[7.0]
  def change
    add_column :documents, :document_url, :string
  end
end

class DocumentSerializer
  include JSONAPI::Serializer
  attributes :title, :patient_id, :document_url, :pdf_url
end

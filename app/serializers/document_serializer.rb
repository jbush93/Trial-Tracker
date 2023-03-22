class DocumentSerializer < ActiveModel::Serializer
  attributes :id, :title, :patient_id, :pdf_url
end

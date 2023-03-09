class NoteSerializer < ActiveModel::Serializer
  attributes :id, :patient_id, :date, :title, :description
  belongs_to :patient
end

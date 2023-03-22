class MeasurementSerializer < ActiveModel::Serializer
  attributes :id, :patient_id, :date, :measurement, :measurement_label
  belongs_to :patient
end

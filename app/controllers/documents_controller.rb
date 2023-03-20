class DocumentsController < ApplicationController
    include Rails.application.routes.url_helpers
...

    require 'google/cloud/storage'
    def create
        @document = Document.create!(document_params)

        render json: DocumentSerializer.new(@document).serializable_hash[:data][:attributes]
    rescue ActiveRecord::RecordInvalid => e
        render json: { errors: e.record.errors.full_messages }, status: :unprocessable_entity
    end

      def show 
        document = Document.find(params[:id])
        respond_to do |format|
          format.html
          format.json { render json: document, status: :ok }
        end
      end

    private

    def document_params
        params.permit(:title, :patient_id, :document_url, :pdf)
    end
end


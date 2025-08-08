<?php

namespace App\Http\Requests;

use Illuminate\Foundation\Http\FormRequest;

class StoreAssetRequest extends FormRequest
{
    /**
     * Determine if the user is authorized to make this request.
     */
    public function authorize(): bool
    {
        return true;
    }

    /**
     * Get the validation rules that apply to the request.
     *
     * @return array<string, \Illuminate\Contracts\Validation\ValidationRule|array<mixed>|string>
     */
    public function rules(): array
    {
        return [
            'asset_tag' => 'required|string|max:255|unique:assets,asset_tag',
            'name' => 'required|string|max:255',
            'asset_category_id' => 'required|exists:asset_categories,id',
            'brand' => 'nullable|string|max:255',
            'model' => 'nullable|string|max:255',
            'serial_number' => 'nullable|string|max:255',
            'purchase_date' => 'nullable|date',
            'purchase_price' => 'nullable|numeric|min:0',
            'condition' => 'required|in:excellent,good,fair,poor,damaged',
            'description' => 'nullable|string',
            'warranty_until' => 'nullable|string|max:255',
            'status' => 'required|in:available,in_use,maintenance,disposed',
        ];
    }

    /**
     * Get custom error messages for validator errors.
     *
     * @return array<string, string>
     */
    public function messages(): array
    {
        return [
            'asset_tag.required' => 'Asset tag is required.',
            'asset_tag.unique' => 'This asset tag is already in use.',
            'name.required' => 'Asset name is required.',
            'asset_category_id.required' => 'Asset category is required.',
            'asset_category_id.exists' => 'Selected category does not exist.',
            'condition.required' => 'Asset condition is required.',
            'status.required' => 'Asset status is required.',
        ];
    }
}
<?php

namespace App\Http\Requests;

use Illuminate\Foundation\Http\FormRequest;

class StoreAssetMovementRequest extends FormRequest
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
            'asset_id' => 'required|exists:assets,id',
            'type' => 'required|in:incoming,outgoing',
            'quantity' => 'required|integer|min:1',
            'purpose' => 'nullable|string|max:500',
            'recipient' => 'nullable|string|max:255',
            'notes' => 'nullable|string',
            'movement_date' => 'required|date',
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
            'asset_id.required' => 'Asset selection is required.',
            'asset_id.exists' => 'Selected asset does not exist.',
            'type.required' => 'Movement type is required.',
            'type.in' => 'Movement type must be either incoming or outgoing.',
            'quantity.required' => 'Quantity is required.',
            'quantity.min' => 'Quantity must be at least 1.',
            'movement_date.required' => 'Movement date is required.',
        ];
    }
}
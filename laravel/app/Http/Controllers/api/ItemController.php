<?php

namespace App\Http\Controllers\api;

use Illuminate\Http\Request;
use App\Http\Controllers\Controller;
use Illuminate\Support\Facades\Validator;
use App\Models\Item;

class ItemController extends Controller
{
    public function index()
    {
        $items = Item::orderBy('name', 'desc')->paginate(1);
        return response()->json([
            'status' => 200,
            'items' => $items,
        ]);
    }

    public function store(Request $request)
    {
        $validator = Validator::make($request->all(), [
            'name' => 'required|max:191',
            'course' => 'required|max:191',
        ]);

        if ($validator->fails()) {
            return response()->json([
                'status' => 422,
                'validate_err' => $validator->messages(),
            ]);
        } else {
            $item = new Item;
            $item->name = $request->input('name');
            $item->course = $request->input('course');
            $item->save();

            return response()->json([
                'status' => 200,
                'message' => 'Item Added Successfully',
            ]);
        }
    }

    public function edit($id)
    {
        $student = Item::find($id);
        if ($student) {
            return response()->json([
                'status' => 200,
                'student' => $student,
            ]);
        } else {
            return response()->json([
                'status' => 404,
                'message' => 'No Student ID Found',
            ]);
        }
    }

    public function update(Request $request, $id)
    {
        $validator = Validator::make($request->all(), [
            'name' => 'required|max:191',
            'course' => 'required|max:191',
        ]);

        if ($validator->fails()) {
            return response()->json([
                'status' => 422,
                'validationErrors' => $validator->messages(),
            ]);
        } else {
            $student = Item::find($id);
            if ($student) {

                $student->name = $request->input('name');
                $student->course = $request->input('course');
                $student->update();

                return response()->json([
                    'status' => 200,
                    'message' => 'Student Updated Successfully',
                ]);
            } else {
                return response()->json([
                    'status' => 404,
                    'message' => 'No Student ID Found',
                ]);
            }
        }
    }

    public function destroy($id)
    {
        $student = Item::find($id);
        if ($student) {
            $student->delete();
            return response()->json([
                'status' => 200,
                'message' => 'Item Deleted Successfully',
            ]);
        } else {
            return response()->json([
                'status' => 404,
                'message' => 'No Item ID Found',
            ]);
        }
    }

    public function search(Request $request)
    {
        $keyword = $request->input('keyword');
        $items = Item::where('name', 'like', '%' . $keyword . '%')->get();
        if ($items) {
            return response()->json([
                'status' => 200,
                'message' => 'Item Search Successfully',
                'items' => $items,
                'keyword' => $keyword
            ])->setStatusCode(200);
        } else {
            return response()->json([
                'status' => 404,
                'message' => 'No Item Name Found',
                'keyword' => $keyword
            ])->setStatusCode(404);
        }
    }
}

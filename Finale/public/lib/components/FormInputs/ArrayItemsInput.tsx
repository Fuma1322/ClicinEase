"use client"

import { Pencil, Plus, X } from "lucide-react";
import React, { useState } from "react";

export default function ArrayItemsInput({
    setItems, 
    items = [], 
    itemTitle,
}: { 
    setItems: any,
    items: string[],
    itemTitle: string;
}) {
  const [item, setItem] = useState("");
  const [showTagForm, setShowTagForm] = useState(false);
  function addItem() {
    if (!item) return;
    setItems([...items, item]);
    setItem("");
  }
  function removeItem(index: any) {
    const newItems = [...items];
    newItems.splice(index, 1);
    setItems(newItems);
  }
  // items END
  return (
    <div className="sm:col-span-2 col-span-full">
      {showTagForm ? (
        <div className="flex items-center">
          <div className="relative w-full">
            <div className="absolute inset-y-0 start-0 flex items-center ps-3 pointer-events-none">
              <Pencil className="w-4 h-4 text-gray-500 dark-text-gray-400" />
            </div>
            <input
              value={item}
              onChange={(e) => setItem(e.target.value)}
              type="text"
              id="voice-search"
              className="bg-gray-50 border border-gray-200 text-gray-600 text-sm rounded-lg focus:ring-gray-500 focus:border-gray-500 block w-full ps-10 p-2.5  dark:bg-gray-950 dark:border-gray-600 dark:placeholder-gray-600 dark:text-gray-400 dark:focus:ring-lime-500 dark:focus:border-lime-500"
              placeholder={`${itemTitle}`}
            />
          </div>
          <button
            onClick={addItem}
            type="button"
            className="shrink-0 inline-flex items-center py-2.5 px-3 ms-2 text-sm font-medium text-white bg-gray-900 rounded-lg border border-lime-700 hover:bg-lime-800 focus:ring-4 focus:outline-none focus:ring-teal-300 dark:bg-gray-950 dark:hover:bg-gray-700 dark:focus:ring-teal-800"
          >
            <Plus className="w-4 h-4 me-2" />
            Add
          </button>
          <button
            type="button"
            onClick={() => setShowTagForm(false)}
            className="ml-3 shrink-0 w-8 h-8 bg-red-400 rounded-full flex items-center justify-center"
          >
            <X className="w-4 h-4 " />
          </button>
        </div>
      ) : (
        <button
          onClick={() => setShowTagForm(true)}
          type="button"
          className="flex items-center space-x-2 text-slate-800 dark:text-slate-300 py-2 px-4 "
        >
          <Plus />
          <span> {itemTitle}</span>
        </button>
      )}
      <div className="flex flex-wrap gap-4 mt-4">
        {items.map((item, i) => {
          return (
            <div
              onClick={() => removeItem(i)}
              key={i}
              className="bg-slate-200 flex space-x-2 items-center dark:bg-slate-600 px-4 py-2 rounded-lg cursor-pointer dark:text-slate-300 text-slate-800"
            >
              <p>{item}</p>
              <X className="w-4 h-4" />
            </div>
          );
        })}
      </div>
    </div>
  );
}
import type { Order, OrderStatus } from "@/backend.d";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Mail, MapPin, Package, Phone, Save, User } from "lucide-react";
import { useState } from "react";

const STATUS_STYLES: Record<string, string> = {
  Pending: "bg-amber-100 text-amber-700 border-amber-200",
  Confirmed: "bg-blue-100 text-blue-700 border-blue-200",
  Shipped: "bg-purple-100 text-purple-700 border-purple-200",
  Delivered: "bg-emerald-100 text-emerald-700 border-emerald-200",
  Cancelled: "bg-destructive/10 text-destructive border-destructive/20",
};

const ORDER_STATUSES = [
  "Pending",
  "Confirmed",
  "Shipped",
  "Delivered",
  "Cancelled",
];

interface Props {
  order: Order;
  onClose: () => void;
  onStatusChange: (status: string) => void;
}

export function AdminOrderDetail({ order, onClose, onStatusChange }: Props) {
  const [newStatus, setNewStatus] = useState<string>(order.status as string);

  function handleSaveStatus() {
    onStatusChange(newStatus);
    onClose();
  }

  const createdDate = order.createdAt
    ? new Date(Number(order.createdAt) / 1_000_000).toLocaleDateString("en-IN")
    : "—";

  return (
    <Dialog open onOpenChange={onClose}>
      <DialogContent
        className="max-w-2xl max-h-[90vh] overflow-y-auto"
        data-ocid="admin-order-detail-dialog"
      >
        <DialogHeader>
          <DialogTitle className="font-display flex items-center gap-2">
            <Package className="w-5 h-5 text-primary" />
            Order {order.id}
          </DialogTitle>
        </DialogHeader>

        <div className="space-y-5 pt-2">
          {/* Customer Info */}
          <div className="bg-muted/40 border border-border rounded-lg p-4 space-y-3">
            <h3 className="font-semibold text-sm text-foreground flex items-center gap-2">
              <User className="w-4 h-4" /> Customer Information
            </h3>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-sm">
              <div>
                <span className="text-muted-foreground text-xs">Name</span>
                <p className="font-medium">{order.customerName}</p>
              </div>
              <div>
                <span className="text-muted-foreground text-xs flex items-center gap-1">
                  <Phone className="w-3 h-3" /> Phone
                </span>
                <p className="font-medium">{order.phone}</p>
              </div>
              <div>
                <span className="text-muted-foreground text-xs flex items-center gap-1">
                  <Mail className="w-3 h-3" /> Email
                </span>
                <p className="font-medium">{order.email}</p>
              </div>
              <div>
                <span className="text-muted-foreground text-xs flex items-center gap-1">
                  <MapPin className="w-3 h-3" /> Address
                </span>
                <p className="font-medium">{order.address}</p>
              </div>
            </div>
          </div>

          {/* Order Meta */}
          <div className="grid grid-cols-3 gap-3 text-sm">
            <div className="bg-muted/40 rounded-lg p-3">
              <p className="text-xs text-muted-foreground">Date</p>
              <p className="font-semibold mt-0.5">{createdDate}</p>
            </div>
            <div className="bg-muted/40 rounded-lg p-3">
              <p className="text-xs text-muted-foreground">Payment</p>
              <p className="font-semibold mt-0.5">{order.paymentMethod}</p>
            </div>
            <div className="bg-muted/40 rounded-lg p-3">
              <p className="text-xs text-muted-foreground">Current Status</p>
              <span
                className={`inline-flex items-center mt-0.5 px-2 py-0.5 rounded-full text-xs font-medium border capitalize ${STATUS_STYLES[order.status as string] ?? "bg-muted"}`}
              >
                {order.status}
              </span>
            </div>
          </div>

          {/* Items Table */}
          <div className="border border-border rounded-lg overflow-hidden">
            <div className="px-4 py-2.5 bg-muted/40 border-b border-border">
              <h3 className="font-semibold text-sm">Ordered Items</h3>
            </div>
            <table className="w-full text-sm">
              <thead>
                <tr className="border-b border-border bg-muted/20">
                  <th className="px-4 py-2 text-left text-xs font-semibold text-muted-foreground">
                    Product
                  </th>
                  <th className="px-4 py-2 text-left text-xs font-semibold text-muted-foreground">
                    Variant
                  </th>
                  <th className="px-4 py-2 text-center text-xs font-semibold text-muted-foreground">
                    Qty
                  </th>
                  <th className="px-4 py-2 text-right text-xs font-semibold text-muted-foreground">
                    Price
                  </th>
                  <th className="px-4 py-2 text-right text-xs font-semibold text-muted-foreground">
                    Subtotal
                  </th>
                </tr>
              </thead>
              <tbody>
                {order.items.map((item, i) => (
                  <tr
                    key={`${item.productId}-${item.variantId}-${i}`}
                    className="border-b border-border last:border-0"
                  >
                    <td className="px-4 py-3 font-medium">
                      {item.productName}
                    </td>
                    <td className="px-4 py-3 text-muted-foreground text-xs">
                      {item.variantLabel}
                    </td>
                    <td className="px-4 py-3 text-center">
                      {Number(item.quantity)}
                    </td>
                    <td className="px-4 py-3 text-right">
                      ₹{Number(item.unitPrice).toLocaleString("en-IN")}
                    </td>
                    <td className="px-4 py-3 text-right font-semibold">
                      ₹
                      {(
                        Number(item.unitPrice) * Number(item.quantity)
                      ).toLocaleString("en-IN")}
                    </td>
                  </tr>
                ))}
              </tbody>
              <tfoot>
                <tr className="bg-muted/20">
                  <td
                    colSpan={4}
                    className="px-4 py-3 text-right font-bold text-sm"
                  >
                    Total
                  </td>
                  <td className="px-4 py-3 text-right font-bold text-primary">
                    ₹{Number(order.totalAmount).toLocaleString("en-IN")}
                  </td>
                </tr>
              </tfoot>
            </table>
          </div>

          {/* Update Status */}
          <div className="bg-muted/30 border border-border rounded-lg p-4 space-y-3">
            <h3 className="font-semibold text-sm">Update Order Status</h3>
            <div className="flex gap-3 items-center">
              <Select value={newStatus} onValueChange={setNewStatus}>
                <SelectTrigger
                  className="flex-1"
                  data-ocid="admin-order-detail-status-select"
                >
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  {ORDER_STATUSES.map((s) => (
                    <SelectItem key={s} value={s} className="capitalize">
                      {s}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
              <Button
                onClick={handleSaveStatus}
                disabled={newStatus === (order.status as string)}
                className="btn-primary gap-2"
                data-ocid="admin-order-detail-save-status-button"
              >
                <Save className="w-4 h-4" />
                Save
              </Button>
            </div>
          </div>

          {/* Actions */}
          <div className="flex justify-end gap-2 pt-2 border-t border-border">
            <Button
              variant="outline"
              onClick={onClose}
              data-ocid="admin-order-detail-close-button"
            >
              Close
            </Button>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}

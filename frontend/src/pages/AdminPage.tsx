import { useState, useEffect, useCallback } from 'react';
import {
  Users, Search, Trash2, RefreshCw, LogOut, ChevronLeft,
  ChevronRight, Database, TrendingUp, CalendarDays, Phone,
  Mail, User, Clock, ShieldCheck, Download, AlertTriangle, X
} from 'lucide-react';

const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:5000/api';
const ADMIN_SECRET = 'kidrove-admin-2026';

interface Enquiry {
  _id: string;
  name: string;
  email: string;
  phone: string;
  createdAt: string;
}

interface Stats {
  total: number;
  today: number;
  thisWeek: number;
}

interface ApiResponse {
  source: string;
  stats: Stats;
  pagination: { page: number; limit: number; totalPages: number };
  data: Enquiry[];
}

// ── Login Gate ──────────────────────────────────────────────────────────────
function LoginGate({ onLogin }: { onLogin: () => void }) {
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError('');
    // Small delay to simulate real auth
    await new Promise(r => setTimeout(r, 600));
    if (password === ADMIN_SECRET) {
      sessionStorage.setItem('admin_auth', 'true');
      onLogin();
    } else {
      setError('Incorrect password. Please try again.');
    }
    setLoading(false);
  };

  return (
    <div className="min-h-screen bg-slate-950 flex items-center justify-center px-4">
      {/* Background glow */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-1/4 left-1/2 -translate-x-1/2 w-96 h-96 bg-brand-indigo/10 rounded-full blur-[120px]" />
      </div>

      <div className="relative w-full max-w-sm">
        <div className="bg-slate-900 border border-slate-800 rounded-3xl p-8 shadow-2xl">
          {/* Logo */}
          <div className="flex flex-col items-center mb-8">
            <div className="w-14 h-14 rounded-2xl bg-brand-indigo flex items-center justify-center text-white font-extrabold text-2xl shadow-[0_6px_0_#474eb5] mb-4">
              K
            </div>
            <h1 className="text-xl font-black text-white">Admin Portal</h1>
            <p className="text-slate-500 text-xs mt-1 font-bold">Kidrove Workshop Dashboard</p>
          </div>

          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label className="block text-xs font-black text-slate-400 uppercase tracking-wider mb-2">
                Admin Password
              </label>
              <div className="relative">
                <ShieldCheck className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-600" />
                <input
                  type="password"
                  value={password}
                  onChange={e => setPassword(e.target.value)}
                  placeholder="Enter admin password"
                  className="w-full pl-10 pr-4 py-3 bg-slate-950 border border-slate-800 rounded-xl text-white text-sm font-bold outline-none focus:border-brand-indigo/50 focus:ring-2 focus:ring-brand-indigo/10 transition-all"
                  autoFocus
                />
              </div>
              {error && (
                <p className="mt-2 text-xs text-rose-400 font-bold flex items-center gap-1.5">
                  <AlertTriangle className="w-3.5 h-3.5" /> {error}
                </p>
              )}
            </div>
            <button
              type="submit"
              disabled={loading || !password}
              className="w-full py-3 bg-brand-indigo hover:opacity-90 disabled:opacity-50 text-white rounded-xl font-black text-sm transition-all shadow-[0_4px_0_#474eb5] cursor-pointer disabled:cursor-not-allowed flex items-center justify-center gap-2"
            >
              {loading ? (
                <RefreshCw className="w-4 h-4 animate-spin" />
              ) : (
                <ShieldCheck className="w-4 h-4" />
              )}
              {loading ? 'Verifying...' : 'Access Dashboard'}
            </button>
          </form>

          <p className="text-center text-slate-700 text-[10px] mt-6 font-bold">
            Hint: <span className="text-slate-600">kidrove-admin-2026</span>
          </p>
        </div>
      </div>
    </div>
  );
}

// ── Confirm Delete Modal ─────────────────────────────────────────────────────
function DeleteModal({
  name, onConfirm, onCancel, loading
}: { name: string; onConfirm: () => void; onCancel: () => void; loading: boolean }) {
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-sm px-4">
      <div className="bg-slate-900 border border-slate-800 rounded-2xl p-6 w-full max-w-sm shadow-2xl">
        <div className="flex items-center gap-3 mb-4">
          <div className="w-10 h-10 rounded-xl bg-rose-500/10 flex items-center justify-center">
            <Trash2 className="w-5 h-5 text-rose-400" />
          </div>
          <div>
            <h3 className="text-white font-black text-sm">Delete Enquiry</h3>
            <p className="text-slate-500 text-xs">This action cannot be undone</p>
          </div>
          <button onClick={onCancel} className="ml-auto text-slate-600 hover:text-white cursor-pointer">
            <X className="w-4 h-4" />
          </button>
        </div>
        <p className="text-slate-400 text-sm mb-6">
          Are you sure you want to delete the enquiry from <span className="text-white font-black">{name}</span>?
        </p>
        <div className="flex gap-3">
          <button
            onClick={onCancel}
            className="flex-1 py-2.5 border border-slate-800 text-slate-400 rounded-xl text-sm font-bold hover:bg-slate-800 transition-colors cursor-pointer"
          >
            Cancel
          </button>
          <button
            onClick={onConfirm}
            disabled={loading}
            className="flex-1 py-2.5 bg-rose-500 hover:bg-rose-600 text-white rounded-xl text-sm font-black transition-colors cursor-pointer disabled:opacity-60 flex items-center justify-center gap-2"
          >
            {loading ? <RefreshCw className="w-3.5 h-3.5 animate-spin" /> : <Trash2 className="w-3.5 h-3.5" />}
            Delete
          </button>
        </div>
      </div>
    </div>
  );
}

// ── Main Dashboard ───────────────────────────────────────────────────────────
function Dashboard({ onLogout }: { onLogout: () => void }) {
  const [data, setData] = useState<ApiResponse | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [search, setSearch] = useState('');
  const [debouncedSearch, setDebouncedSearch] = useState('');
  const [page, setPage] = useState(1);
  const [sort, setSort] = useState<'desc' | 'asc'>('desc');
  const [deleteTarget, setDeleteTarget] = useState<Enquiry | null>(null);
  const [deleteLoading, setDeleteLoading] = useState(false);
  const [toast, setToast] = useState('');

  // Debounce search input
  useEffect(() => {
    const t = setTimeout(() => { setDebouncedSearch(search); setPage(1); }, 400);
    return () => clearTimeout(t);
  }, [search]);

  const fetchEnquiries = useCallback(async () => {
    setLoading(true);
    setError('');
    try {
      const params = new URLSearchParams({
        search: debouncedSearch,
        page: String(page),
        limit: '10',
        sort
      });
      const res = await fetch(`${API_URL}/admin/enquiries?${params}`, {
        headers: { 'x-admin-secret': ADMIN_SECRET }
      });
      if (!res.ok) throw new Error('Failed to fetch enquiries');
      const json = await res.json();
      setData(json);
    } catch (err: any) {
      setError(err.message || 'Something went wrong');
    } finally {
      setLoading(false);
    }
  }, [debouncedSearch, page, sort]);

  useEffect(() => { fetchEnquiries(); }, [fetchEnquiries]);

  const handleDelete = async () => {
    if (!deleteTarget) return;
    setDeleteLoading(true);
    try {
      const res = await fetch(`${API_URL}/admin/enquiries/${deleteTarget._id}`, {
        method: 'DELETE',
        headers: { 'x-admin-secret': ADMIN_SECRET }
      });
      if (!res.ok) throw new Error('Delete failed');
      showToast('Enquiry deleted successfully');
      setDeleteTarget(null);
      fetchEnquiries();
    } catch {
      showToast('Failed to delete enquiry');
    } finally {
      setDeleteLoading(false);
    }
  };

  const showToast = (msg: string) => {
    setToast(msg);
    setTimeout(() => setToast(''), 3000);
  };

  const exportCSV = () => {
    if (!data?.data.length) return;
    const header = ['Name', 'Email', 'Phone', 'Registered On'];
    const rows = data.data.map(e => [
      e.name,
      e.email,
      e.phone,
      new Date(e.createdAt).toLocaleString('en-IN')
    ]);
    const csv = [header, ...rows].map(r => r.join(',')).join('\n');
    const blob = new Blob([csv], { type: 'text/csv' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `kidrove-enquiries-${Date.now()}.csv`;
    a.click();
    URL.revokeObjectURL(url);
  };

  const formatDate = (iso: string) => {
    const d = new Date(iso);
    return d.toLocaleDateString('en-IN', { day: '2-digit', month: 'short', year: 'numeric' }) +
      ' · ' + d.toLocaleTimeString('en-IN', { hour: '2-digit', minute: '2-digit' });
  };

  const stats = data?.stats;

  return (
    <div className="min-h-screen bg-slate-950 text-white font-sans">
      {/* Toast */}
      {toast && (
        <div className="fixed top-4 right-4 z-50 bg-slate-800 border border-slate-700 text-white text-xs font-bold px-4 py-3 rounded-xl shadow-xl flex items-center gap-2 animate-fade-in">
          <ShieldCheck className="w-4 h-4 text-brand-mint" /> {toast}
        </div>
      )}

      {/* Delete Modal */}
      {deleteTarget && (
        <DeleteModal
          name={deleteTarget.name}
          onConfirm={handleDelete}
          onCancel={() => setDeleteTarget(null)}
          loading={deleteLoading}
        />
      )}

      {/* Header */}
      <header className="border-b border-slate-800 bg-slate-900/80 backdrop-blur-md sticky top-0 z-40 px-6 py-4">
        <div className="max-w-7xl mx-auto flex items-center justify-between gap-4">
          <div className="flex items-center gap-3">
            <div className="w-9 h-9 rounded-xl bg-brand-indigo flex items-center justify-center text-white font-extrabold text-base shadow-[0_4px_0_#474eb5]">
              K
            </div>
            <div>
              <h1 className="text-sm font-black text-white leading-tight">Admin Dashboard</h1>
              <p className="text-slate-500 text-[10px] font-bold">Kidrove Workshop Enquiries</p>
            </div>
          </div>
          <div className="flex items-center gap-3">
            {data?.source && (
              <span className={`hidden sm:flex items-center gap-1.5 text-[10px] font-black px-2.5 py-1 rounded-full border ${data.source === 'mongodb' ? 'bg-emerald-500/10 border-emerald-500/20 text-emerald-400' : 'bg-amber-500/10 border-amber-500/20 text-amber-400'}`}>
                <Database className="w-3 h-3" />
                {data.source === 'mongodb' ? 'MongoDB Atlas' : 'In-Memory'}
              </span>
            )}
            <button
              onClick={onLogout}
              className="flex items-center gap-1.5 text-xs font-bold text-slate-400 hover:text-white border border-slate-800 hover:border-slate-700 px-3 py-2 rounded-xl transition-all cursor-pointer"
            >
              <LogOut className="w-3.5 h-3.5" /> Logout
            </button>
          </div>
        </div>
      </header>

      <main className="max-w-7xl mx-auto px-4 sm:px-6 py-8 space-y-6">

        {/* Stats Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
          {[
            { label: 'Total Enquiries', value: stats?.total ?? '—', icon: Users, color: 'text-brand-indigo border-brand-indigo/20 bg-brand-indigo/5' },
            { label: "Registered Today", value: stats?.today ?? '—', icon: CalendarDays, color: 'text-brand-mint border-brand-mint/20 bg-brand-mint/5' },
            { label: 'This Week', value: stats?.thisWeek ?? '—', icon: TrendingUp, color: 'text-brand-sunshine border-brand-sunshine/20 bg-brand-sunshine/5' },
          ].map((s, i) => (
            <div key={i} className={`border rounded-2xl p-5 flex items-center gap-4 ${s.color}`}>
              <div className="w-11 h-11 rounded-xl bg-slate-900 border border-slate-800 flex items-center justify-center shrink-0">
                <s.icon className={`w-5 h-5 ${s.color.split(' ')[0]}`} />
              </div>
              <div>
                <p className="text-slate-500 text-[10px] font-black uppercase tracking-widest">{s.label}</p>
                <p className="text-white text-2xl font-black mt-0.5">{loading ? '...' : s.value}</p>
              </div>
            </div>
          ))}
        </div>

        {/* Table Card */}
        <div className="bg-slate-900 border border-slate-800 rounded-2xl overflow-hidden">
          {/* Toolbar */}
          <div className="px-5 py-4 border-b border-slate-800 flex flex-col sm:flex-row gap-3 items-start sm:items-center justify-between">
            <div className="relative w-full sm:w-64">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-600" />
              <input
                type="text"
                value={search}
                onChange={e => setSearch(e.target.value)}
                placeholder="Search name, email, phone..."
                className="w-full pl-9 pr-4 py-2.5 bg-slate-950 border border-slate-800 rounded-xl text-sm text-white font-bold placeholder:text-slate-700 outline-none focus:border-slate-700 transition-all"
              />
              {search && (
                <button onClick={() => setSearch('')} className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-600 hover:text-white cursor-pointer">
                  <X className="w-3.5 h-3.5" />
                </button>
              )}
            </div>
            <div className="flex items-center gap-2 shrink-0">
              <select
                value={sort}
                onChange={e => { setSort(e.target.value as 'desc' | 'asc'); setPage(1); }}
                className="bg-slate-950 border border-slate-800 text-slate-400 text-xs font-bold px-3 py-2.5 rounded-xl outline-none cursor-pointer"
              >
                <option value="desc">Newest First</option>
                <option value="asc">Oldest First</option>
              </select>
              <button
                onClick={exportCSV}
                title="Export CSV"
                className="p-2.5 border border-slate-800 rounded-xl text-slate-400 hover:text-white hover:border-slate-700 transition-all cursor-pointer"
              >
                <Download className="w-4 h-4" />
              </button>
              <button
                onClick={fetchEnquiries}
                title="Refresh"
                className="p-2.5 border border-slate-800 rounded-xl text-slate-400 hover:text-white hover:border-slate-700 transition-all cursor-pointer"
              >
                <RefreshCw className={`w-4 h-4 ${loading ? 'animate-spin' : ''}`} />
              </button>
            </div>
          </div>

          {/* Table Body */}
          {error ? (
            <div className="py-16 text-center">
              <AlertTriangle className="w-8 h-8 text-rose-400 mx-auto mb-3" />
              <p className="text-rose-400 font-bold text-sm">{error}</p>
              <button onClick={fetchEnquiries} className="mt-4 text-xs text-slate-500 hover:text-white underline cursor-pointer">Try again</button>
            </div>
          ) : loading ? (
            <div className="py-16 text-center">
              <RefreshCw className="w-6 h-6 text-brand-indigo animate-spin mx-auto mb-3" />
              <p className="text-slate-500 text-sm font-bold">Loading enquiries...</p>
            </div>
          ) : data?.data.length === 0 ? (
            <div className="py-16 text-center">
              <Users className="w-8 h-8 text-slate-700 mx-auto mb-3" />
              <p className="text-slate-500 font-bold text-sm">
                {debouncedSearch ? 'No results found for your search.' : 'No enquiries yet.'}
              </p>
            </div>
          ) : (
            <>
              {/* Desktop Table */}
              <div className="hidden md:block overflow-x-auto">
                <table className="w-full text-sm">
                  <thead>
                    <tr className="border-b border-slate-800">
                      <th className="text-left px-5 py-3 text-[10px] font-black text-slate-600 uppercase tracking-wider">#</th>
                      <th className="text-left px-5 py-3 text-[10px] font-black text-slate-600 uppercase tracking-wider">Name</th>
                      <th className="text-left px-5 py-3 text-[10px] font-black text-slate-600 uppercase tracking-wider">Email</th>
                      <th className="text-left px-5 py-3 text-[10px] font-black text-slate-600 uppercase tracking-wider">Phone</th>
                      <th className="text-left px-5 py-3 text-[10px] font-black text-slate-600 uppercase tracking-wider">Registered</th>
                      <th className="px-5 py-3" />
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-slate-800/60">
                    {data.data.map((e, i) => (
                      <tr key={e._id} className="group hover:bg-slate-800/30 transition-colors">
                        <td className="px-5 py-4 text-slate-700 text-xs font-bold">
                          {(page - 1) * 10 + i + 1}
                        </td>
                        <td className="px-5 py-4">
                          <div className="flex items-center gap-2.5">
                            <div className="w-8 h-8 rounded-xl bg-brand-indigo/10 border border-brand-indigo/20 flex items-center justify-center shrink-0">
                              <User className="w-4 h-4 text-brand-indigo" />
                            </div>
                            <span className="font-black text-white">{e.name}</span>
                          </div>
                        </td>
                        <td className="px-5 py-4 text-slate-400 font-bold">
                          <div className="flex items-center gap-1.5">
                            <Mail className="w-3.5 h-3.5 text-slate-600 shrink-0" />
                            {e.email}
                          </div>
                        </td>
                        <td className="px-5 py-4 text-slate-400 font-bold">
                          <div className="flex items-center gap-1.5">
                            <Phone className="w-3.5 h-3.5 text-slate-600 shrink-0" />
                            {e.phone}
                          </div>
                        </td>
                        <td className="px-5 py-4 text-slate-500 text-xs font-bold">
                          <div className="flex items-center gap-1.5">
                            <Clock className="w-3 h-3 text-slate-700 shrink-0" />
                            {formatDate(e.createdAt)}
                          </div>
                        </td>
                        <td className="px-5 py-4">
                          <button
                            onClick={() => setDeleteTarget(e)}
                            className="opacity-0 group-hover:opacity-100 p-1.5 text-slate-600 hover:text-rose-400 hover:bg-rose-500/10 rounded-lg transition-all cursor-pointer"
                            title="Delete enquiry"
                          >
                            <Trash2 className="w-4 h-4" />
                          </button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>

              {/* Mobile Cards */}
              <div className="md:hidden divide-y divide-slate-800">
                {data.data.map((e, i) => (
                  <div key={e._id} className="p-4 space-y-2">
                    <div className="flex items-start justify-between">
                      <div className="flex items-center gap-2">
                        <div className="w-8 h-8 rounded-xl bg-brand-indigo/10 border border-brand-indigo/20 flex items-center justify-center">
                          <User className="w-4 h-4 text-brand-indigo" />
                        </div>
                        <div>
                          <p className="font-black text-white text-sm">{e.name}</p>
                          <p className="text-slate-600 text-[10px] font-bold">#{(page - 1) * 10 + i + 1}</p>
                        </div>
                      </div>
                      <button
                        onClick={() => setDeleteTarget(e)}
                        className="p-1.5 text-slate-700 hover:text-rose-400 cursor-pointer"
                      >
                        <Trash2 className="w-4 h-4" />
                      </button>
                    </div>
                    <p className="text-slate-400 text-xs font-bold flex items-center gap-1.5"><Mail className="w-3 h-3 text-slate-600" />{e.email}</p>
                    <p className="text-slate-400 text-xs font-bold flex items-center gap-1.5"><Phone className="w-3 h-3 text-slate-600" />{e.phone}</p>
                    <p className="text-slate-600 text-[10px] font-bold flex items-center gap-1.5"><Clock className="w-3 h-3" />{formatDate(e.createdAt)}</p>
                  </div>
                ))}
              </div>

              {/* Pagination */}
              {data.pagination.totalPages > 1 && (
                <div className="px-5 py-4 border-t border-slate-800 flex items-center justify-between">
                  <p className="text-slate-600 text-xs font-bold">
                    Page {page} of {data.pagination.totalPages}
                  </p>
                  <div className="flex gap-2">
                    <button
                      onClick={() => setPage(p => Math.max(1, p - 1))}
                      disabled={page <= 1}
                      className="p-2 border border-slate-800 rounded-xl text-slate-400 hover:text-white disabled:opacity-30 disabled:cursor-not-allowed cursor-pointer transition-all"
                    >
                      <ChevronLeft className="w-4 h-4" />
                    </button>
                    <button
                      onClick={() => setPage(p => Math.min(data.pagination.totalPages, p + 1))}
                      disabled={page >= data.pagination.totalPages}
                      className="p-2 border border-slate-800 rounded-xl text-slate-400 hover:text-white disabled:opacity-30 disabled:cursor-not-allowed cursor-pointer transition-all"
                    >
                      <ChevronRight className="w-4 h-4" />
                    </button>
                  </div>
                </div>
              )}
            </>
          )}
        </div>
      </main>
    </div>
  );
}

// ── Admin Page Root ──────────────────────────────────────────────────────────
export default function AdminPage() {
  const [authed, setAuthed] = useState(() => sessionStorage.getItem('admin_auth') === 'true');

  const handleLogout = () => {
    sessionStorage.removeItem('admin_auth');
    setAuthed(false);
  };

  if (!authed) return <LoginGate onLogin={() => setAuthed(true)} />;
  return <Dashboard onLogout={handleLogout} />;
}

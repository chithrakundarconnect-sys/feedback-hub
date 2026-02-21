'use client';

import { useEffect, useState } from 'react';
import { doc, getDoc, setDoc } from 'firebase/firestore';
import { db } from '@/lib/firebase';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';

export default function AdminSettingsPage() {
  const [siteName, setSiteName] = useState('');
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);

  // Load existing settings
  useEffect(() => {
    const loadSettings = async () => {
      const docRef = doc(db, 'settings', 'general');
      const docSnap = await getDoc(docRef);

      if (docSnap.exists()) {
        setSiteName(docSnap.data().siteName || '');
      }

      setLoading(false);
    };

    loadSettings();
  }, []);

  // Save settings
  const handleSave = async () => {
    setSaving(true);

    await setDoc(doc(db, 'settings', 'general'), {
      siteName: siteName,
    });

    alert('Settings saved successfully!');
    setSaving(false);
  };

  if (loading) return <p className="p-6">Loading settings...</p>;

  return (
    <div className="max-w-xl p-6">
      <h1 className="text-2xl font-bold mb-6">Admin Settings</h1>

      <div className="space-y-4">
        <div>
          <label className="text-sm font-medium">Website / Event Name</label>
          <Input
            value={siteName}
            onChange={(e) => setSiteName(e.target.value)}
            placeholder="Enter your restaurant or event name"
          />
        </div>

        <Button onClick={handleSave} disabled={saving}>
          {saving ? 'Saving...' : 'Save Settings'}
        </Button>
      </div>
    </div>
  );
}
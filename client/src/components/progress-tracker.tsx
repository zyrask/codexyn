import { useState } from "react";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { useToast } from "@/hooks/use-toast";
import { apiRequest } from "@/lib/queryClient";
import type { ProgressUpdate, ProgressImage, InsertProgressUpdate, InsertProgressImage } from "@shared/schema";
import { Trash2, Edit3, Plus, Save, X } from "lucide-react";

interface ProgressTrackerProps {
  editMode: boolean;
}

export default function ProgressTracker({ editMode }: ProgressTrackerProps) {
  const [editingUpdate, setEditingUpdate] = useState<number | null>(null);
  const [editingImage, setEditingImage] = useState<number | null>(null);
  const [showAddUpdate, setShowAddUpdate] = useState(false);
  const [showAddImage, setShowAddImage] = useState(false);
  const { toast } = useToast();
  const queryClient = useQueryClient();

  const { data: updates, isLoading: updatesLoading } = useQuery<ProgressUpdate[]>({
    queryKey: ['/api/progress-updates']
  });

  const { data: images, isLoading: imagesLoading } = useQuery<ProgressImage[]>({
    queryKey: ['/api/progress-images']
  });

  // Mutations for updates
  const createUpdateMutation = useMutation({
    mutationFn: (data: InsertProgressUpdate) => apiRequest('/api/progress-updates', 'POST', data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['/api/progress-updates'] });
      setShowAddUpdate(false);
      toast({ title: "Update added successfully" });
    },
    onError: () => toast({ title: "Failed to add update", variant: "destructive" })
  });

  const updateUpdateMutation = useMutation({
    mutationFn: ({ id, data }: { id: number; data: Partial<InsertProgressUpdate> }) => 
      apiRequest(`/api/progress-updates/${id}`, 'PATCH', data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['/api/progress-updates'] });
      setEditingUpdate(null);
      toast({ title: "Update saved successfully" });
    },
    onError: () => toast({ title: "Failed to save update", variant: "destructive" })
  });

  const deleteUpdateMutation = useMutation({
    mutationFn: (id: number) => apiRequest(`/api/progress-updates/${id}`, 'DELETE'),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['/api/progress-updates'] });
      toast({ title: "Update deleted successfully" });
    },
    onError: () => toast({ title: "Failed to delete update", variant: "destructive" })
  });

  // Mutations for images
  const createImageMutation = useMutation({
    mutationFn: (data: InsertProgressImage) => apiRequest('/api/progress-images', 'POST', data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['/api/progress-images'] });
      setShowAddImage(false);
      toast({ title: "Image added successfully" });
    },
    onError: () => toast({ title: "Failed to add image", variant: "destructive" })
  });

  const updateImageMutation = useMutation({
    mutationFn: ({ id, data }: { id: number; data: Partial<InsertProgressImage> }) => 
      apiRequest(`/api/progress-images/${id}`, 'PATCH', data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['/api/progress-images'] });
      setEditingImage(null);
      toast({ title: "Image saved successfully" });
    },
    onError: () => toast({ title: "Failed to save image", variant: "destructive" })
  });

  const deleteImageMutation = useMutation({
    mutationFn: (id: number) => apiRequest(`/api/progress-images/${id}`, 'DELETE'),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['/api/progress-images'] });
      toast({ title: "Image deleted successfully" });
    },
    onError: () => toast({ title: "Failed to delete image", variant: "destructive" })
  });

  // Form components
  const UpdateForm = ({ update, onSave, onCancel }: { 
    update?: ProgressUpdate; 
    onSave: (data: InsertProgressUpdate) => void; 
    onCancel: () => void;
  }) => {
    const [formData, setFormData] = useState({
      week: update?.week || '',
      title: update?.title || '',
      description: update?.description || '',
      date: update?.date || new Date().toISOString().split('T')[0]
    });

    return (
      <div className="bg-card rounded-xl p-6 border border-border">
        <div className="space-y-4">
          <div className="grid grid-cols-2 gap-4">
            <Input
              placeholder="Week"
              value={formData.week}
              onChange={(e) => setFormData(prev => ({ ...prev, week: e.target.value }))}
            />
            <Input
              type="date"
              value={formData.date}
              onChange={(e) => setFormData(prev => ({ ...prev, date: e.target.value }))}
            />
          </div>
          <Input
            placeholder="Title"
            value={formData.title}
            onChange={(e) => setFormData(prev => ({ ...prev, title: e.target.value }))}
          />
          <Textarea
            placeholder="Description"
            value={formData.description}
            onChange={(e) => setFormData(prev => ({ ...prev, description: e.target.value }))}
            rows={3}
          />
          <div className="flex space-x-2">
            <Button 
              onClick={() => onSave(formData)}
              disabled={!formData.week || !formData.title || !formData.description}
              size="sm"
            >
              <Save className="w-4 h-4 mr-1" />
              Save
            </Button>
            <Button onClick={onCancel} variant="outline" size="sm">
              <X className="w-4 h-4 mr-1" />
              Cancel
            </Button>
          </div>
        </div>
      </div>
    );
  };

  const ImageForm = ({ image, onSave, onCancel }: {
    image?: ProgressImage;
    onSave: (data: InsertProgressImage) => void;
    onCancel: () => void;
  }) => {
    const [formData, setFormData] = useState({
      title: image?.title || '',
      url: image?.url || '',
      description: image?.description || ''
    });

    return (
      <div className="bg-card rounded-lg border border-border p-4">
        <div className="space-y-4">
          <Input
            placeholder="Image title"
            value={formData.title}
            onChange={(e) => setFormData(prev => ({ ...prev, title: e.target.value }))}
          />
          <Input
            placeholder="Image URL"
            value={formData.url}
            onChange={(e) => setFormData(prev => ({ ...prev, url: e.target.value }))}
          />
          <Textarea
            placeholder="Description (optional)"
            value={formData.description}
            onChange={(e) => setFormData(prev => ({ ...prev, description: e.target.value }))}
            rows={2}
          />
          <div className="flex space-x-2">
            <Button 
              onClick={() => onSave(formData)}
              disabled={!formData.title || !formData.url}
              size="sm"
            >
              <Save className="w-4 h-4 mr-1" />
              Save
            </Button>
            <Button onClick={onCancel} variant="outline" size="sm">
              <X className="w-4 h-4 mr-1" />
              Cancel
            </Button>
          </div>
        </div>
      </div>
    );
  };

  if (updatesLoading || imagesLoading) {
    return (
      <section id="progress-tracker" className="py-20 bg-background">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary mx-auto"></div>
            <p className="mt-4 text-muted-foreground">Loading progress data...</p>
          </div>
        </div>
      </section>
    );
  }

  return (
    <section id="progress-tracker" className="py-20 bg-background">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div 
          className="text-center mb-16"
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
        >
          <div className="flex items-center justify-center space-x-4 mb-4">
            <h2 className="text-4xl sm:text-5xl font-bold text-primary">Progress Tracker</h2>
            {editMode && (
              <div className="flex items-center px-3 py-1 bg-primary/20 text-primary rounded-full text-sm">
                <Edit3 className="w-4 h-4 mr-1" />
                Edit Mode
              </div>
            )}
          </div>
          <p className="text-muted-foreground text-lg">
            {editMode ? 
              "Behind-the-scenes development progress - You can now edit and manage content" : 
              "Behind-the-scenes look at Broadcast Error's development"
            }
          </p>
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Progress Updates */}
          <motion.div 
            className="space-y-6"
            initial={{ opacity: 0, x: -40 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
          >
            <div className="flex items-center justify-between">
              <h3 className="text-2xl font-semibold">Latest Updates</h3>
              {editMode && (
                <Button
                  onClick={() => setShowAddUpdate(true)}
                  size="sm"
                  className="flex items-center"
                >
                  <Plus className="w-4 h-4 mr-1" />
                  Add Update
                </Button>
              )}
            </div>
            
            {showAddUpdate && (
              <UpdateForm
                onSave={(data) => createUpdateMutation.mutate(data)}
                onCancel={() => setShowAddUpdate(false)}
              />
            )}
            
            {updates && updates.length > 0 ? (
              updates.map((update, index) => (
                <motion.div
                  key={update.id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: index * 0.1 }}
                >
                  {editingUpdate === update.id ? (
                    <UpdateForm
                      update={update}
                      onSave={(data) => updateUpdateMutation.mutate({ id: update.id, data })}
                      onCancel={() => setEditingUpdate(null)}
                    />
                  ) : (
                    <div className="bg-card rounded-xl p-6 border border-border group">
                      <div className="flex items-center justify-between mb-3">
                        <span className="text-primary font-semibold">{update.week}</span>
                        <div className="flex items-center space-x-2">
                          <span className="text-muted-foreground text-sm">{update.date}</span>
                          {editMode && (
                            <div className="opacity-0 group-hover:opacity-100 transition-opacity flex space-x-1">
                              <Button
                                onClick={() => setEditingUpdate(update.id)}
                                size="sm"
                                variant="ghost"
                              >
                                <Edit3 className="w-4 h-4" />
                              </Button>
                              <Button
                                onClick={() => deleteUpdateMutation.mutate(update.id)}
                                size="sm"
                                variant="ghost"
                                className="text-destructive hover:text-destructive"
                              >
                                <Trash2 className="w-4 h-4" />
                              </Button>
                            </div>
                          )}
                        </div>
                      </div>
                      <h4 className="text-lg font-semibold mb-2">{update.title}</h4>
                      <p className="text-muted-foreground">{update.description}</p>
                    </div>
                  )}
                </motion.div>
              ))
            ) : (
              <div className="bg-card rounded-xl p-6 border border-border text-center">
                <p className="text-muted-foreground">No progress updates available yet.</p>
                {editMode && (
                  <Button
                    onClick={() => setShowAddUpdate(true)}
                    className="mt-4"
                    size="sm"
                  >
                    <Plus className="w-4 h-4 mr-1" />
                    Add First Update
                  </Button>
                )}
              </div>
            )}
          </motion.div>

          {/* Progress Gallery */}
          <motion.div 
            className="space-y-6"
            initial={{ opacity: 0, x: 40 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, delay: 0.4 }}
          >
            <div className="flex items-center justify-between">
              <h3 className="text-2xl font-semibold">Development Gallery</h3>
              {editMode && (
                <Button
                  onClick={() => setShowAddImage(true)}
                  size="sm"
                  className="flex items-center"
                >
                  <Plus className="w-4 h-4 mr-1" />
                  Add Image
                </Button>
              )}
            </div>

            {showAddImage && (
              <ImageForm
                onSave={(data) => createImageMutation.mutate(data)}
                onCancel={() => setShowAddImage(false)}
              />
            )}
            
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {images && images.length > 0 ? (
                images.map((image, index) => (
                  <motion.div
                    key={image.id}
                    initial={{ opacity: 0, scale: 0.9 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ duration: 0.5, delay: index * 0.1 }}
                  >
                    {editingImage === image.id ? (
                      <ImageForm
                        image={image}
                        onSave={(data) => updateImageMutation.mutate({ id: image.id, data })}
                        onCancel={() => setEditingImage(null)}
                      />
                    ) : (
                      <div className="bg-card rounded-lg border border-border overflow-hidden aspect-video group relative">
                        {editMode && (
                          <div className="absolute top-2 right-2 opacity-0 group-hover:opacity-100 transition-opacity z-10">
                            <div className="flex space-x-1 bg-background/80 backdrop-blur-sm rounded-md p-1">
                              <Button
                                onClick={() => setEditingImage(image.id)}
                                size="sm"
                                variant="ghost"
                                className="h-6 w-6 p-0"
                              >
                                <Edit3 className="w-3 h-3" />
                              </Button>
                              <Button
                                onClick={() => deleteImageMutation.mutate(image.id)}
                                size="sm"
                                variant="ghost"
                                className="h-6 w-6 p-0 text-destructive hover:text-destructive"
                              >
                                <Trash2 className="w-3 h-3" />
                              </Button>
                            </div>
                          </div>
                        )}
                        
                        {image.url ? (
                          <img 
                            src={image.url} 
                            alt={image.title}
                            className="w-full h-full object-cover"
                          />
                        ) : (
                          <div className="w-full h-full flex items-center justify-center text-muted-foreground">
                            <div className="text-center">
                              <svg className="w-8 h-8 mx-auto mb-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
                              </svg>
                              <p className="text-sm">{image.title}</p>
                            </div>
                          </div>
                        )}
                        
                        {image.title && (
                          <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-background/80 to-transparent p-2">
                            <p className="text-sm font-medium text-foreground">{image.title}</p>
                            {image.description && (
                              <p className="text-xs text-muted-foreground mt-1">{image.description}</p>
                            )}
                          </div>
                        )}
                      </div>
                    )}
                  </motion.div>
                ))
              ) : (
                <div className="col-span-full bg-card rounded-lg p-8 border border-border text-center">
                  <div className="text-muted-foreground">
                    <svg className="w-12 h-12 mx-auto mb-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
                    </svg>
                    <p className="text-lg mb-2">No development images yet</p>
                    <p className="text-sm">Images and screenshots will appear here as development progresses</p>
                    {editMode && (
                      <Button
                        onClick={() => setShowAddImage(true)}
                        className="mt-4"
                        size="sm"
                      >
                        <Plus className="w-4 h-4 mr-1" />
                        Add First Image
                      </Button>
                    )}
                  </div>
                </div>
              )}
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}

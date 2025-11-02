"use client";

import { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useAccount } from "wagmi";
import Section from "../../components/ui/Section";
import Card from "../../components/ui/Card";
import Button from "../../components/ui/Button";

interface MintStep {
  id: number;
  title: string;
  description: string;
  icon: string;
  isCompleted: boolean;
  isActive: boolean;
}

interface NFTMetadata {
  name: string;
  description: string;
  image: File | null;
  imagePreview: string;
  attributes: Array<{
    trait_type: string;
    value: string;
  }>;
  collection: string;
  royalties: number;
  supply: number;
  price: number;
  blockchain: "base" | "zora";
}

interface MintingProgress {
  step: string;
  status: "pending" | "processing" | "completed" | "error";
  txHash?: string;
}

export default function MintPage() {
  const { isConnected, address } = useAccount();
  const [currentStep, setCurrentStep] = useState<number>(1);
  const [isUploading, setIsUploading] = useState<boolean>(false);
  const [isMinting, setIsMinting] = useState<boolean>(false);
  const [mintingProgress, setMintingProgress] = useState<MintingProgress[]>([]);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const [metadata, setMetadata] = useState<NFTMetadata>({
    name: "",
    description: "",
    image: null,
    imagePreview: "",
    attributes: [],
    collection: "",
    royalties: 5,
    supply: 1,
    price: 0,
    blockchain: "base"
  });

  const [steps, setSteps] = useState<MintStep[]>([
    {
      id: 1,
      title: "Upload Asset",
      description: "Choose your image, video, or audio file",
      icon: "📁",
      isCompleted: false,
      isActive: true
    },
    {
      id: 2,
      title: "Add Details",
      description: "Name, description, and attributes",
      icon: "✏️",
      isCompleted: false,
      isActive: false
    },
    {
      id: 3,
      title: "Configure",
      description: "Collection, royalties, and pricing",
      icon: "⚙️",
      isCompleted: false,
      isActive: false
    },
    {
      id: 4,
      title: "Review & Mint",
      description: "Final review and blockchain deployment",
      icon: "🚀",
      isCompleted: false,
      isActive: false
    }
  ]);

  // Update step completion status
  useEffect(() => {
    const newSteps = [...steps];
    
    // Step 1: Upload Asset
    newSteps[0].isCompleted = !!metadata.image;
    
    // Step 2: Add Details
    newSteps[1].isCompleted = metadata.name.length > 0 && metadata.description.length > 0;
    
    // Step 3: Configure
    newSteps[2].isCompleted = metadata.collection.length > 0 && metadata.price > 0;
    
    // Update active step
    newSteps.forEach((step, index) => {
      step.isActive = step.id === currentStep;
    });
    
    setSteps(newSteps);
  }, [metadata, currentStep]);

  const handleFileUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (!file) return;

    // Validate file type
    const validTypes = ['image/jpeg', 'image/png', 'image/gif', 'image/webp', 'video/mp4', 'audio/mp3'];
    if (!validTypes.includes(file.type)) {
      alert('Please upload a valid image, video, or audio file');
      return;
    }

    // Validate file size (max 50MB)
    if (file.size > 50 * 1024 * 1024) {
      alert('File size must be less than 50MB');
      return;
    }

    setIsUploading(true);
    
    // Create preview
    const reader = new FileReader();
    reader.onload = (e) => {
      setMetadata(prev => ({
        ...prev,
        image: file,
        imagePreview: e.target?.result as string
      }));
      setIsUploading(false);
    };
    reader.readAsDataURL(file);
  };

  const addAttribute = () => {
    setMetadata(prev => ({
      ...prev,
      attributes: [...prev.attributes, { trait_type: "", value: "" }]
    }));
  };

  const updateAttribute = (index: number, field: 'trait_type' | 'value', value: string) => {
    setMetadata(prev => ({
      ...prev,
      attributes: prev.attributes.map((attr, i) => 
        i === index ? { ...attr, [field]: value } : attr
      )
    }));
  };

  const removeAttribute = (index: number) => {
    setMetadata(prev => ({
      ...prev,
      attributes: prev.attributes.filter((_, i) => i !== index)
    }));
  };

  const nextStep = () => {
    if (currentStep < 4) {
      setCurrentStep(currentStep + 1);
    }
  };

  const prevStep = () => {
    if (currentStep > 1) {
      setCurrentStep(currentStep - 1);
    }
  };

  const simulateMinting = async () => {
    setIsMinting(true);
    const progressSteps = [
      { step: "Uploading to IPFS", status: "processing" as const },
      { step: "Creating metadata", status: "pending" as const },
      { step: "Deploying contract", status: "pending" as const },
      { step: "Minting NFT", status: "pending" as const },
      { step: "Finalizing", status: "pending" as const }
    ];
    
    setMintingProgress(progressSteps);

    for (let i = 0; i < progressSteps.length; i++) {
      await new Promise(resolve => setTimeout(resolve, 2000));
      
      setMintingProgress(prev => prev.map((step, index) => ({
        ...step,
        status: index < i ? "completed" : index === i ? "processing" : "pending"
      })));
    }

    // Complete final step
    await new Promise(resolve => setTimeout(resolve, 1000));
    setMintingProgress(prev => prev.map(step => ({
      ...step,
      status: "completed",
      txHash: step.step === "Minting NFT" ? "0x1234567890abcdef..." : undefined
    })));

    setIsMinting(false);
  };

  const canProceedToNext = () => {
    switch (currentStep) {
      case 1: return !!metadata.image;
      case 2: return metadata.name.length > 0 && metadata.description.length > 0;
      case 3: return metadata.collection.length > 0 && metadata.price > 0;
      case 4: return true;
      default: return false;
    }
  };

  const getFileTypeIcon = (file: File | null) => {
    if (!file) return "📁";
    if (file.type.startsWith('image/')) return "🖼️";
    if (file.type.startsWith('video/')) return "🎥";
    if (file.type.startsWith('audio/')) return "🎵";
    return "📄";
  };

  const formatFileSize = (bytes: number) => {
    if (bytes === 0) return '0 Bytes';
    const k = 1024;
    const sizes = ['Bytes', 'KB', 'MB', 'GB'];
    const i = Math.floor(Math.log(bytes) / Math.log(k));
    return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + ' ' + sizes[i];
  };

  return (
    <main>
      {/* Hero Section */}
      <section className="mx-auto max-w-6xl px-4 py-16 text-center">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
        >
          <div className="inline-flex items-center gap-2 bg-gradient-to-r from-blue-500/20 to-purple-500/20 border border-blue-400/30 rounded-full px-4 py-2 mb-6">
            <span className="text-blue-400">🎨</span>
            <span className="text-slate-300 text-sm">NFT MINTING STUDIO</span>
          </div>
          <h1 className="text-4xl sm:text-5xl font-bold tracking-tight text-slate-100 mb-6">
            Create Your <span className="bg-gradient-to-r from-blue-400 via-purple-500 to-pink-500 bg-clip-text text-transparent">NFT</span>
          </h1>
          <p className="text-xl text-slate-300 max-w-2xl mx-auto mb-8">
            Follow our guided process to mint your first NFT on Base or Zora. No coding required!
          </p>
          {!isConnected && (
            <div className="bg-yellow-900/20 border border-yellow-400/30 rounded-lg p-4 max-w-md mx-auto">
              <p className="text-yellow-300 text-sm">
                🔗 Connect your wallet to start minting
              </p>
            </div>
          )}
        </motion.div>
      </section>

      {/* Progress Steps */}
      <section className="mx-auto max-w-6xl px-4 py-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
        >
          <div className="flex justify-center mb-12">
            <div className="flex items-center gap-4">
              {steps.map((step, index) => (
                <div key={step.id} className="flex items-center">
                  <div className={`flex items-center justify-center w-12 h-12 rounded-full border-2 transition-all duration-300 ${
                    step.isCompleted 
                      ? "bg-green-500 border-green-400 text-white" 
                      : step.isActive 
                        ? "bg-blue-500 border-blue-400 text-white" 
                        : "bg-slate-800 border-slate-600 text-slate-400"
                  }`}>
                    {step.isCompleted ? "✓" : step.icon}
                  </div>
                  <div className="ml-3 hidden sm:block">
                    <div className={`text-sm font-medium ${
                      step.isActive ? "text-blue-400" : step.isCompleted ? "text-green-400" : "text-slate-400"
                    }`}>
                      {step.title}
                    </div>
                    <div className="text-xs text-slate-500">{step.description}</div>
                  </div>
                  {index < steps.length - 1 && (
                    <div className={`w-8 h-0.5 mx-4 ${
                      steps[index + 1].isCompleted || step.isCompleted ? "bg-green-400" : "bg-slate-600"
                    }`}></div>
                  )}
                </div>
              ))}
            </div>
          </div>
        </motion.div>
      </section>

      {/* Main Content */}
      <section className="container-custom py-mobile">
        <AnimatePresence mode="wait">
          {/* Step 1: Upload Asset */}
          {currentStep === 1 && (
            <motion.div
              key="step1"
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -20 }}
              transition={{ duration: 0.3 }}
            >
              <Card variant="glow" className="p-mobile touch-card">
                <h2 className="text-mobile-xl sm:text-2xl font-bold text-slate-100 mb-mobile text-center">
                  📁 Upload Your Asset
                </h2>
                
                <div className="space-y-mobile">
                  {/* File Upload Area */}
                  <div 
                    className={`border-2 border-dashed rounded-mobile p-mobile text-center transition-all duration-300 cursor-pointer touch-card micro-lift ${
                      metadata.image 
                        ? "border-green-400/50 bg-green-900/10" 
                        : "border-slate-600 hover:border-blue-400/50 hover:bg-blue-900/10"
                    }`}
                    onClick={() => fileInputRef.current?.click()}
                  >
                    <input
                      ref={fileInputRef}
                      type="file"
                      accept="image/*,video/*,audio/*"
                      onChange={handleFileUpload}
                      className="hidden"
                    />
                    
                    {isUploading ? (
                      <div className="space-y-4">
                        <div className="text-4xl">⏳</div>
                        <div className="text-slate-300">Uploading...</div>
                      </div>
                    ) : metadata.image ? (
                      <div className="space-y-mobile">
                        <div className="text-mobile-2xl">{getFileTypeIcon(metadata.image)}</div>
                        <div className="text-green-400 font-medium text-mobile-base">{metadata.image.name}</div>
                        <div className="text-slate-400 text-mobile-sm">{formatFileSize(metadata.image.size)}</div>
                        {metadata.imagePreview && metadata.image.type.startsWith('image/') && (
                          <div className="mt-mobile">
                            <img 
                              src={metadata.imagePreview} 
                              alt="Preview" 
                              className="max-w-xs max-h-48 mx-auto rounded-mobile border border-slate-600"
                            />
                          </div>
                        )}
                        <Button variant="secondary" size="sm" onClick={() => fileInputRef.current?.click()} className="touch-target micro-bounce">
                          Change File
                        </Button>
                      </div>
                    ) : (
                      <div className="space-y-mobile">
                        <div className="text-mobile-2xl">📁</div>
                        <div className="text-slate-300 font-medium text-mobile-base">Click to upload your file</div>
                        <div className="text-slate-400 text-mobile-sm">
                          Supports: JPG, PNG, GIF, WebP, MP4, MP3 (Max 50MB)
                        </div>
                      </div>
                    )}
                  </div>

                  {/* File Requirements */}
                  <div className="bg-slate-800/30 rounded-mobile p-mobile">
                    <h3 className="font-medium text-slate-200 mb-mobile text-mobile-base">📋 File Requirements</h3>
                    <ul className="space-y-2 text-mobile-sm text-slate-400">
                      <li>• <strong>Images:</strong> JPG, PNG, GIF, WebP</li>
                      <li>• <strong>Videos:</strong> MP4 (recommended for animated content)</li>
                      <li>• <strong>Audio:</strong> MP3 (for music NFTs)</li>
                      <li>• <strong>Size:</strong> Maximum 50MB per file</li>
                      <li>• <strong>Quality:</strong> High resolution recommended (1080p+)</li>
                    </ul>
                  </div>
                </div>
              </Card>
            </motion.div>
          )}

          {/* Step 2: Add Details */}
          {currentStep === 2 && (
            <motion.div
              key="step2"
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -20 }}
              transition={{ duration: 0.3 }}
            >
              <Card variant="glow" className="p-mobile touch-card">
                <h2 className="text-mobile-xl sm:text-2xl font-bold text-slate-100 mb-mobile text-center">
                  ✏️ Add Details & Attributes
                </h2>
                
                <div className="space-y-mobile">
                  {/* Basic Info */}
                  <div className="grid grid-mobile-1 gap-mobile">
                    <div>
                      <label className="block text-mobile-sm font-medium text-slate-300 mb-2">
                        NFT Name *
                      </label>
                      <input
                        type="text"
                        value={metadata.name}
                        onChange={(e) => setMetadata(prev => ({ ...prev, name: e.target.value }))}
                        placeholder="Enter a catchy name for your NFT"
                        className="w-full px-mobile py-mobile bg-slate-800/50 border border-slate-600/50 rounded-mobile text-slate-200 placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-blue-500 text-mobile-base touch-target"
                      />
                    </div>
                    
                    <div>
                      <label className="block text-mobile-sm font-medium text-slate-300 mb-2">
                        Description *
                      </label>
                      <textarea
                        value={metadata.description}
                        onChange={(e) => setMetadata(prev => ({ ...prev, description: e.target.value }))}
                        placeholder="Describe your NFT, its story, and what makes it special..."
                        rows={4}
                        className="w-full px-mobile py-mobile bg-slate-800/50 border border-slate-600/50 rounded-mobile text-slate-200 placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-blue-500 resize-none text-mobile-base touch-target"
                      />
                    </div>
                  </div>

                  {/* Attributes */}
                  <div>
                    <div className="flex items-center justify-between mb-mobile">
                      <label className="block text-mobile-sm font-medium text-slate-300">
                        Attributes (Optional)
                      </label>
                      <Button size="sm" onClick={addAttribute} className="touch-target micro-bounce">
                        + Add Attribute
                      </Button>
                    </div>
                    
                    <div className="space-y-mobile">
                      {metadata.attributes.map((attr, index) => (
                        <div key={index} className="flex gap-mobile items-center">
                          <input
                            type="text"
                            value={attr.trait_type}
                            onChange={(e) => updateAttribute(index, 'trait_type', e.target.value)}
                            placeholder="Trait (e.g., Color)"
                            className="flex-1 px-mobile py-2 bg-slate-800/50 border border-slate-600/50 rounded-mobile text-slate-200 placeholder-slate-400 focus:outline-none focus:ring-1 focus:ring-blue-500 text-mobile-sm touch-target"
                          />
                          <input
                            type="text"
                            value={attr.value}
                            onChange={(e) => updateAttribute(index, 'value', e.target.value)}
                            placeholder="Value (e.g., Blue)"
                            className="flex-1 px-mobile py-2 bg-slate-800/50 border border-slate-600/50 rounded-mobile text-slate-200 placeholder-slate-400 focus:outline-none focus:ring-1 focus:ring-blue-500 text-mobile-sm touch-target"
                          />
                          <Button 
                            size="sm" 
                            variant="ghost" 
                            onClick={() => removeAttribute(index)}
                            className="text-red-400 hover:text-red-300 touch-target micro-bounce"
                          >
                            ✕
                          </Button>
                        </div>
                      ))}
                      
                      {metadata.attributes.length === 0 && (
                        <div className="text-center py-mobile text-slate-400">
                          <div className="text-mobile-xl mb-2">🏷️</div>
                          <p className="text-mobile-sm">No attributes added yet</p>
                          <p className="text-mobile-xs">Attributes help categorize and add rarity to your NFT</p>
                        </div>
                      )}
                    </div>
                  </div>

                  {/* Tips */}
                  <div className="bg-blue-900/20 border border-blue-400/30 rounded-mobile p-mobile">
                    <h3 className="font-medium text-blue-300 mb-mobile text-mobile-base">💡 Pro Tips</h3>
                    <ul className="space-y-1 text-mobile-sm text-blue-200">
                      <li>• Use descriptive names that capture the essence of your art</li>
                      <li>• Tell a story in your description to connect with collectors</li>
                      <li>• Add attributes like "Style", "Rarity", "Color" for better discoverability</li>
                      <li>• Keep descriptions concise but engaging (100-300 words)</li>
                    </ul>
                  </div>
                </div>
              </Card>
            </motion.div>
          )}

          {/* Step 3: Configure */}
          {currentStep === 3 && (
            <motion.div
              key="step3"
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -20 }}
              transition={{ duration: 0.3 }}
            >
              <Card variant="glow" className="p-mobile touch-card">
                <h2 className="text-mobile-xl sm:text-2xl font-bold text-slate-100 mb-mobile text-center">
                  ⚙️ Configure Settings
                </h2>
                
                <div className="space-y-mobile">
                  {/* Blockchain Selection */}
                  <div>
                    <label className="block text-mobile-sm font-medium text-slate-300 mb-mobile">
                      Blockchain Network *
                    </label>
                    <div className="grid grid-mobile-2 gap-mobile">
                      <button
                        onClick={() => setMetadata(prev => ({ ...prev, blockchain: "base" }))}
                        className={`p-mobile rounded-mobile border-2 transition-all touch-card micro-bounce ${
                          metadata.blockchain === "base"
                            ? "border-blue-400 bg-blue-900/20"
                            : "border-slate-600 hover:border-slate-500"
                        }`}
                      >
                        <div className="text-mobile-xl mb-2">🔷</div>
                        <div className="font-medium text-slate-200 text-mobile-base">Base</div>
                        <div className="text-mobile-xs text-slate-400">Low fees, fast transactions</div>
                      </button>
                      <button
                        onClick={() => setMetadata(prev => ({ ...prev, blockchain: "zora" }))}
                        className={`p-mobile rounded-mobile border-2 transition-all touch-card micro-bounce ${
                          metadata.blockchain === "zora"
                            ? "border-purple-400 bg-purple-900/20"
                            : "border-slate-600 hover:border-slate-500"
                        }`}
                      >
                        <div className="text-mobile-xl mb-2">⚡</div>
                        <div className="font-medium text-slate-200 text-mobile-base">Zora</div>
                        <div className="text-mobile-xs text-slate-400">Creator-focused platform</div>
                      </button>
                    </div>
                  </div>

                  {/* Collection & Pricing */}
                  <div className="grid grid-mobile-1 md:grid-cols-2 gap-mobile">
                    <div>
                      <label className="block text-mobile-sm font-medium text-slate-300 mb-2">
                        Collection Name *
                      </label>
                      <input
                        type="text"
                        value={metadata.collection}
                        onChange={(e) => setMetadata(prev => ({ ...prev, collection: e.target.value }))}
                        placeholder="My First Collection"
                        className="w-full px-mobile py-mobile bg-slate-800/50 border border-slate-600/50 rounded-mobile text-slate-200 placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-blue-500 touch-target"
                      />
                    </div>
                    
                    <div>
                      <label className="block text-mobile-sm font-medium text-slate-300 mb-2">
                        Price (ETH) *
                      </label>
                      <input
                        type="number"
                        step="0.001"
                        min="0"
                        value={metadata.price}
                        onChange={(e) => setMetadata(prev => ({ ...prev, price: parseFloat(e.target.value) || 0 }))}
                        placeholder="0.1"
                        className="w-full px-mobile py-mobile bg-slate-800/50 border border-slate-600/50 rounded-mobile text-slate-200 placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-blue-500 touch-target"
                      />
                    </div>
                  </div>

                  {/* Advanced Settings */}
                  <div className="grid grid-mobile-1 md:grid-cols-2 gap-mobile">
                    <div>
                      <label className="block text-mobile-sm font-medium text-slate-300 mb-2">
                        Supply
                      </label>
                      <input
                        type="number"
                        min="1"
                        max="10000"
                        value={metadata.supply}
                        onChange={(e) => setMetadata(prev => ({ ...prev, supply: parseInt(e.target.value) || 1 }))}
                        className="w-full px-mobile py-mobile bg-slate-800/50 border border-slate-600/50 rounded-mobile text-slate-200 placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-blue-500 touch-target"
                      />
                      <p className="text-mobile-xs text-slate-400 mt-1">Number of copies to mint</p>
                    </div>
                    
                    <div>
                      <label className="block text-mobile-sm font-medium text-slate-300 mb-2">
                        Royalties (%)
                      </label>
                      <input
                        type="number"
                        min="0"
                        max="10"
                        step="0.5"
                        value={metadata.royalties}
                        onChange={(e) => setMetadata(prev => ({ ...prev, royalties: parseFloat(e.target.value) || 0 }))}
                        className="w-full px-mobile py-mobile bg-slate-800/50 border border-slate-600/50 rounded-mobile text-slate-200 placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-blue-500 touch-target"
                      />
                      <p className="text-mobile-xs text-slate-400 mt-1">Earnings from future sales</p>
                    </div>
                  </div>

                  {/* Gas Estimation */}
                  <div className="bg-slate-800/30 rounded-mobile p-mobile">
                    <h3 className="font-medium text-slate-200 mb-mobile">⛽ Estimated Costs</h3>
                    <div className="grid grid-cols-2 gap-mobile text-mobile-sm">
                      <div className="flex justify-between">
                        <span className="text-slate-400">Minting Fee:</span>
                        <span className="text-slate-200">~$2.50</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-slate-400">Platform Fee:</span>
                        <span className="text-slate-200">2.5%</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-slate-400">Gas Fee:</span>
                        <span className="text-slate-200">~$1.20</span>
                      </div>
                      <div className="flex justify-between font-medium">
                        <span className="text-slate-200">Total:</span>
                        <span className="text-green-400">~$3.70</span>
                      </div>
                    </div>
                  </div>
                </div>
              </Card>
            </motion.div>
          )}

          {/* Step 4: Review & Mint */}
          {currentStep === 4 && (
            <motion.div
              key="step4"
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -20 }}
              transition={{ duration: 0.3 }}
            >
              <Card variant="glow" className="p-mobile touch-card">
                <h2 className="text-mobile-xl sm:text-2xl font-bold text-slate-100 mb-mobile text-center">
                  🚀 Review & Mint
                </h2>
                
                {!isMinting ? (
                  <div className="space-y-mobile">
                    {/* NFT Preview */}
                    <div className="grid grid-mobile-1 lg:grid-cols-2 gap-mobile">
                      {/* Preview Card */}
                      <div>
                        <h3 className="font-medium text-slate-200 mb-mobile">NFT Preview</h3>
                        <Card className="p-mobile">
                          {metadata.imagePreview && (
                            <div className="aspect-square bg-slate-800 rounded-mobile mb-mobile overflow-hidden">
                              <img 
                                src={metadata.imagePreview} 
                                alt={metadata.name}
                                className="w-full h-full object-cover"
                              />
                            </div>
                          )}
                          <h4 className="font-semibold text-slate-100 mb-2 text-mobile-base">{metadata.name || "Untitled"}</h4>
                          <p className="text-mobile-sm text-slate-400 mb-mobile">{metadata.description || "No description"}</p>
                          <div className="flex justify-between items-center">
                            <span className="text-mobile-lg font-bold text-green-400">{metadata.price} ETH</span>
                            <span className="text-mobile-xs text-slate-500">Supply: {metadata.supply}</span>
                          </div>
                        </Card>
                      </div>

                      {/* Details Summary */}
                      <div>
                        <h3 className="font-medium text-slate-200 mb-mobile">Summary</h3>
                        <div className="space-y-mobile">
                          <div className="bg-slate-800/30 rounded-mobile p-mobile">
                            <div className="grid grid-cols-2 gap-mobile text-mobile-sm">
                              <div>
                                <span className="text-slate-400">Collection:</span>
                                <div className="text-slate-200">{metadata.collection}</div>
                              </div>
                              <div>
                                <span className="text-slate-400">Blockchain:</span>
                                <div className="text-slate-200 capitalize">{metadata.blockchain}</div>
                              </div>
                              <div>
                                <span className="text-slate-400">Royalties:</span>
                                <div className="text-slate-200">{metadata.royalties}%</div>
                              </div>
                              <div>
                                <span className="text-slate-400">File Size:</span>
                                <div className="text-slate-200">
                                  {metadata.image ? formatFileSize(metadata.image.size) : "N/A"}
                                </div>
                              </div>
                            </div>
                          </div>

                          {/* Attributes */}
                          {metadata.attributes.length > 0 && (
                            <div className="bg-slate-800/30 rounded-mobile p-mobile">
                              <h4 className="text-mobile-sm font-medium text-slate-300 mb-mobile">Attributes</h4>
                              <div className="grid grid-cols-2 gap-2">
                                {metadata.attributes.map((attr, index) => (
                                  <div key={index} className="bg-slate-700/50 rounded-mobile px-mobile py-2">
                                    <div className="text-mobile-xs text-slate-400">{attr.trait_type}</div>
                                    <div className="text-mobile-sm text-slate-200">{attr.value}</div>
                                  </div>
                                ))}
                              </div>
                            </div>
                          )}
                        </div>
                      </div>
                    </div>

                    {/* Final Actions */}
                    <div className="text-center">
                      <div className="bg-blue-900/20 border border-blue-400/30 rounded-mobile p-mobile mb-mobile">
                        <p className="text-blue-300 text-mobile-sm">
                          🔒 Once minted, your NFT will be permanently stored on the blockchain and cannot be modified.
                        </p>
                      </div>
                      
                      <Button 
                        size="lg" 
                        onClick={simulateMinting}
                        disabled={!isConnected}
                        className="bg-gradient-to-r from-blue-500 to-purple-600 px-mobile touch-target micro-bounce"
                      >
                        {isConnected ? "🚀 Mint NFT" : "🔗 Connect Wallet to Mint"}
                      </Button>
                    </div>
                  </div>
                ) : (
                  /* Minting Progress */
                  <div className="space-y-mobile">
                    <div className="text-center">
                      <div className="text-mobile-2xl mb-mobile">⚡</div>
                      <h3 className="text-mobile-xl font-semibold text-slate-100 mb-2">Minting in Progress</h3>
                      <p className="text-slate-400 text-mobile-base">Please don't close this window</p>
                    </div>

                    <div className="space-y-mobile">
                      {mintingProgress.map((step, index) => (
                        <div key={index} className="flex items-center gap-mobile p-mobile bg-slate-800/30 rounded-mobile">
                          <div className={`w-8 h-8 rounded-full flex items-center justify-center ${
                            step.status === "completed" ? "bg-green-500" :
                            step.status === "processing" ? "bg-blue-500 animate-pulse" :
                            step.status === "error" ? "bg-red-500" :
                            "bg-slate-600"
                          }`}>
                            {step.status === "completed" ? "✓" :
                             step.status === "processing" ? "⏳" :
                             step.status === "error" ? "✗" : "⏸️"}
                          </div>
                          <div className="flex-1">
                            <div className="text-slate-200 text-mobile-base">{step.step}</div>
                            {step.txHash && (
                              <div className="text-mobile-xs text-blue-400">
                                Tx: {step.txHash}
                              </div>
                            )}
                          </div>
                          <div className={`text-mobile-sm ${
                            step.status === "completed" ? "text-green-400" :
                            step.status === "processing" ? "text-blue-400" :
                            step.status === "error" ? "text-red-400" :
                            "text-slate-500"
                          }`}>
                            {step.status === "completed" ? "Done" :
                             step.status === "processing" ? "Processing..." :
                             step.status === "error" ? "Failed" : "Pending"}
                          </div>
                        </div>
                      ))}
                    </div>

                    {mintingProgress.every(step => step.status === "completed") && (
                      <div className="text-center">
                        <div className="bg-green-900/20 border border-green-400/30 rounded-mobile p-mobile mb-mobile">
                          <div className="text-mobile-2xl mb-mobile">🎉</div>
                          <h3 className="text-mobile-xl font-semibold text-green-400 mb-2">NFT Minted Successfully!</h3>
                          <p className="text-green-300 text-mobile-base">Your NFT is now live on the blockchain</p>
                        </div>
                        <div className="flex gap-mobile justify-center">
                          <Button variant="secondary" className="touch-target micro-bounce">
                            📱 Share on Social
                          </Button>
                          <Button className="touch-target micro-bounce">
                            👁️ View NFT
                          </Button>
                        </div>
                      </div>
                    )}
                  </div>
                )}
              </Card>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Navigation */}
        {!isMinting && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.4 }}
            className="flex justify-between mt-mobile"
          >
            <Button 
              variant="secondary" 
              onClick={prevStep}
              disabled={currentStep === 1}
              className="touch-target micro-bounce"
            >
              ← Previous
            </Button>
            <Button 
              onClick={nextStep}
              disabled={currentStep === 4 || !canProceedToNext()}
              className={`touch-target micro-bounce ${canProceedToNext() ? "bg-gradient-to-r from-blue-500 to-purple-600" : ""}`}
            >
              {currentStep === 4 ? "Complete" : "Next →"}
            </Button>
          </motion.div>
        )}
      </section>

      {/* Help Section */}
      <section className="mx-auto max-w-6xl px-4 py-16">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.5 }}
        >
          <Card variant="glow" className="p-mobile bg-gradient-to-r from-blue-900/30 to-purple-900/30 border-blue-400/30 touch-card">
            <h2 className="text-mobile-xl sm:text-3xl font-bold text-slate-100 mb-mobile text-center">
              Need Help?
            </h2>
            <div className="grid grid-mobile-1 md:grid-cols-3 gap-mobile">
              <div className="text-center">
                <div className="text-mobile-xl mb-mobile">📚</div>
                <h3 className="font-semibold text-slate-200 mb-2 text-mobile-base">Documentation</h3>
                <p className="text-slate-300 text-mobile-sm">Step-by-step guides and tutorials</p>
              </div>
              <div className="text-center">
                <div className="text-mobile-xl mb-mobile">💬</div>
                <h3 className="font-semibold text-slate-200 mb-2 text-mobile-base">Community</h3>
                <p className="text-slate-300 text-mobile-sm">Get help from other creators</p>
              </div>
              <div className="text-center">
                <div className="text-mobile-xl mb-mobile">🎥</div>
                <h3 className="font-semibold text-slate-200 mb-2 text-mobile-base">Video Tutorials</h3>
                <p className="text-slate-300 text-mobile-sm">Watch and learn from experts</p>
              </div>
            </div>
            <div className="text-center mt-mobile">
              <Button variant="secondary" className="touch-target micro-bounce">
                🆘 Get Support
              </Button>
            </div>
          </Card>
        </motion.div>
      </section>
    </main>
  );
}
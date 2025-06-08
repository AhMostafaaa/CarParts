// statistics.component.ts
import { Component, OnInit, OnDestroy, ViewChild, ElementRef, AfterViewInit, Input, Output, EventEmitter } from '@angular/core';
import { CarPart } from '../../Shared/Models/car-card';

export interface Statistics {
  totalParts: number;
  totalSales: number;
  totalOrders: number;
  averageOrderValue: number;
  favoriteParts: number;
  newParts: number;
  partsGrowth: number;
  salesGrowth: number;
  ordersGrowth: number;
  avgOrderGrowth: number;
  favoritePercentage: number;
  newPartsPercentage: number;
  newConditionCount: number;
  usedConditionCount: number;
  newConditionPercentage: number;
  usedConditionPercentage: number;
  topSellingParts: TopSellingPart[];
}

export interface TopSellingPart {
  name: string;
  brand: string;
  model: string;
  salesCount: number;
  revenue: number;
}

export interface ChartData {
  labels: string[];
  datasets: any[];
}

@Component({
  selector: 'app-statistics',
  templateUrl: './statistics.component.html',
  styleUrls: ['./statistics.component.scss']
})
export class StatisticsComponent implements OnInit, OnDestroy, AfterViewInit {
  @ViewChild('salesChart') salesChartRef!: ElementRef<HTMLCanvasElement>;
  @ViewChild('brandsChart') brandsChartRef!: ElementRef<HTMLCanvasElement>;

  @Input() parts: CarPart[] = [];
  @Output() close = new EventEmitter<void>();

  selectedPeriod = '6months';
  chartsLoaded = false;
  showExportOptions = false;

  // Statistics Data
  statistics: Statistics = {
    totalParts: 0,
    totalSales: 0,
    totalOrders: 0,
    averageOrderValue: 0,
    favoriteParts: 0,
    newParts: 0,
    partsGrowth: 15.2,
    salesGrowth: 8.5,
    ordersGrowth: 12.3,
    avgOrderGrowth: 5.8,
    favoritePercentage: 0,
    newPartsPercentage: 0,
    newConditionCount: 0,
    usedConditionCount: 0,
    newConditionPercentage: 0,
    usedConditionPercentage: 0,
    topSellingParts: []
  };

  // Chart instances
  private salesChart: any;
  private brandsChart: any;

  // Sample sales data for charts
  private salesData: ChartData = {
    labels: ['يناير', 'فبراير', 'مارس', 'أبريل', 'مايو', 'يونيو'],
    datasets: [{
      label: 'المبيعات (جنيه)',
      data: [12000, 19000, 15000, 25000, 22000, 30000],
      borderColor: '#5e72e4',
      backgroundColor: 'rgba(94, 114, 228, 0.1)',
      borderWidth: 3,
      fill: true,
      tension: 0.4
    }]
  };

  private brandsData: ChartData = {
    labels: [],
    datasets: [{
      label: 'عدد قطع الغيار',
      data: [],
      backgroundColor: [
        '#FF6384',
        '#36A2EB',
        '#FFCE56',
        '#4BC0C0',
        '#9966FF',
        '#FF9F40',
        '#FF6384',
        '#C9CBCF'
      ],
      borderWidth: 0
    }]
  };

  constructor() {}

  ngOnInit(): void {
    this.calculateStatistics();
  }

  ngAfterViewInit(): void {
    // Simulate loading time for charts
    setTimeout(() => {
      this.initializeCharts();
      this.chartsLoaded = true;
    }, 500);
  }

  ngOnDestroy(): void {
    if (this.salesChart) {
      this.salesChart.destroy();
    }
    if (this.brandsChart) {
      this.brandsChart.destroy();
    }
  }

  onClose(): void {
    this.close.emit();
  }

  private initializeCharts(): void {
    // Note: You'll need to install Chart.js and import it
    // npm install chart.js
    // import Chart from 'chart.js/auto';

    // For now, we'll use a placeholder
    console.log('Charts would be initialized here with Chart.js');

    // Prepare brands data
    this.prepareBrandsData();

    // Example of how it would look:
    /*
    if (this.salesChartRef && this.salesChartRef.nativeElement) {
      const ctx = this.salesChartRef.nativeElement.getContext('2d');
      this.salesChart = new Chart(ctx, {
        type: 'line',
        data: this.salesData,
        options: {
          responsive: true,
          maintainAspectRatio: false,
          plugins: {
            legend: {
              display: false
            }
          },
          scales: {
            y: {
              beginAtZero: true,
              grid: {
                color: '#e9ecef'
              },
              ticks: {
                font: {
                  family: 'Cairo'
                }
              }
            },
            x: {
              grid: {
                display: false
              },
              ticks: {
                font: {
                  family: 'Cairo'
                }
              }
            }
          }
        }
      });
    }

    if (this.brandsChartRef && this.brandsChartRef.nativeElement) {
      const ctx = this.brandsChartRef.nativeElement.getContext('2d');
      this.brandsChart = new Chart(ctx, {
        type: 'doughnut',
        data: this.brandsData,
        options: {
          responsive: true,
          maintainAspectRatio: false,
          plugins: {
            legend: {
              position: 'bottom',
              labels: {
                font: {
                  family: 'Cairo'
                },
                padding: 20
              }
            }
          }
        }
      });
    }
    */
  }

  private prepareBrandsData(): void {
    // Calculate brand distribution
    const brandCounts = this.parts.reduce((counts, part) => {
      counts[part.car.brand] = (counts[part.car.brand] || 0) + 1;
      return counts;
    }, {} as Record<string, number>);

    this.brandsData.labels = Object.keys(brandCounts);
    this.brandsData.datasets[0].data = Object.values(brandCounts);
  }

  private calculateStatistics(): void {
    const totalParts = this.parts.length;
    const favoriteParts = this.parts.filter(part => part.isFavorite).length;
    const newParts = this.parts.filter(part => part.condition === 'جديد').length;
    const usedParts = this.parts.filter(part => part.condition === 'مستعمل').length;

    // Calculate total sales (example calculation)
    const totalSales = this.parts.reduce((sum, part) => sum + part.priceAfterDiscount, 0) * 2.5;

    // Mock data for demonstration
    const totalOrders = 156;
    const averageOrderValue = totalOrders > 0 ? totalSales / totalOrders : 0;

    this.statistics = {
      totalParts,
      totalSales,
      totalOrders,
      averageOrderValue,
      favoriteParts,
      newParts,
      partsGrowth: 15.2,
      salesGrowth: 8.5,
      ordersGrowth: 12.3,
      avgOrderGrowth: 5.8,
      favoritePercentage: totalParts > 0 ? Math.round((favoriteParts / totalParts) * 100) : 0,
      newPartsPercentage: totalParts > 0 ? Math.round((newParts / totalParts) * 100) : 0,
      newConditionCount: newParts,
      usedConditionCount: usedParts,
      newConditionPercentage: totalParts > 0 ? Math.round((newParts / totalParts) * 100) : 0,
      usedConditionPercentage: totalParts > 0 ? Math.round((usedParts / totalParts) * 100) : 0,
      topSellingParts: this.generateTopSellingParts()
    };
  }

  private generateTopSellingParts(): TopSellingPart[] {
    // Generate mock top selling parts based on current parts
    const topParts = this.parts.slice(0, 5).map((part, index) => ({
      name: part.name,
      brand: part.car.brand,
      model: part.car.model,
      salesCount: Math.floor(Math.random() * 50) + 10,
      revenue: (Math.floor(Math.random() * 10000) + 5000)
    }));

    return topParts.sort((a, b) => b.salesCount - a.salesCount);
  }

  updateChartData(): void {
    console.log('Updating chart data for period:', this.selectedPeriod);

    switch (this.selectedPeriod) {
      case '6months':
        this.salesData.labels = ['يناير', 'فبراير', 'مارس', 'أبريل', 'مايو', 'يونيو'];
        this.salesData.datasets[0].data = [12000, 19000, 15000, 25000, 22000, 30000];
        break;
      case '12months':
        this.salesData.labels = ['ديسمبر 2023', 'يناير', 'فبراير', 'مارس', 'أبريل', 'مايو', 'يونيو', 'يوليو', 'أغسطس', 'سبتمبر', 'أكتوبر', 'نوفمبر'];
        this.salesData.datasets[0].data = [8000, 12000, 19000, 15000, 25000, 22000, 30000, 28000, 32000, 27000, 35000, 33000];
        break;
      case 'year':
        this.salesData.labels = ['Q1 2024', 'Q2 2024', 'Q3 2024', 'Q4 2024'];
        this.salesData.datasets[0].data = [46000, 77000, 90000, 95000];
        break;
    }

    // Redraw charts if they exist
    if (this.salesChart) {
      this.salesChart.data = this.salesData;
      this.salesChart.update();
    }
  }

  refreshStatistics(): void {
    console.log('Refreshing statistics...');
    this.calculateStatistics();
    this.prepareBrandsData();

    // Update charts if they exist
    if (this.brandsChart) {
      this.brandsChart.data = this.brandsData;
      this.brandsChart.update();
    }

    // Show a temporary success message (you can implement a toast service)
    console.log('تم تحديث الإحصائيات بنجاح');
  }

  exportStatistics(): void {
    this.showExportOptions = !this.showExportOptions;
  }

  exportAs(format: 'pdf' | 'excel' | 'json'): void {
    console.log(`Exporting statistics as ${format}...`);

    const statisticsData = {
      exportDate: new Date().toISOString(),
      statistics: this.statistics,
      totalRevenue: this.getTotalRevenue(),
      averagePartPrice: this.getAveragePartPrice(),
      mostPopularBrand: this.getMostPopularBrand(),
      deliveryPercentage: this.getDeliveryPercentage(),
      parts: this.parts
    };

    switch (format) {
      case 'json':
        this.downloadJSON(statisticsData);
        break;
      case 'excel':
        console.log('Excel export would be implemented here');
        // Implement Excel export using libraries like xlsx
        break;
      case 'pdf':
        console.log('PDF export would be implemented here');
        // Implement PDF export using libraries like jsPDF
        break;
    }

    this.showExportOptions = false;
  }

  private downloadJSON(data: any): void {
    const dataStr = JSON.stringify(data, null, 2);
    const dataUri = 'data:application/json;charset=utf-8,'+ encodeURIComponent(dataStr);

    const exportFileDefaultName = `statistics_${new Date().toISOString().split('T')[0]}.json`;

    const linkElement = document.createElement('a');
    linkElement.setAttribute('href', dataUri);
    linkElement.setAttribute('download', exportFileDefaultName);
    linkElement.click();
  }

  // Utility methods for statistics
  getTotalRevenue(): number {
    return this.parts.reduce((total, part) => total + (part.priceAfterDiscount * Math.floor(Math.random() * 10 + 1)), 0);
  }

  getAveragePartPrice(): number {
    if (this.parts.length === 0) return 0;
    const totalPrice = this.parts.reduce((total, part) => total + part.priceAfterDiscount, 0);
    return Math.round(totalPrice / this.parts.length);
  }

  getMostPopularBrand(): string {
    if (this.parts.length === 0) return 'غير متوفر';

    const brandCounts = this.parts.reduce((counts, part) => {
      counts[part.car.brand] = (counts[part.car.brand] || 0) + 1;
      return counts;
    }, {} as Record<string, number>);

    return Object.entries(brandCounts)
      .sort(([,a], [,b]) => b - a)[0]?.[0] || 'غير متوفر';
  }

  getPartsWithDelivery(): number {
    return this.parts.filter(part => part.hasDelivery).length;
  }

  getDeliveryPercentage(): number {
    if (this.parts.length === 0) return 0;
    return Math.round((this.getPartsWithDelivery() / this.parts.length) * 100);
  }

  getMaxSales(): number {
    if (this.statistics.topSellingParts.length === 0) return 1;
    return Math.max(...this.statistics.topSellingParts.map(part => part.salesCount));
  }

  // Keyboard shortcuts
  onKeydown(event: KeyboardEvent): void {
    if (event.key === 'Escape') {
      this.onClose();
    }
    if ((event.ctrlKey || event.metaKey) && event.key === 's') {
      event.preventDefault();
      this.exportAs('json');
    }
    if ((event.ctrlKey || event.metaKey) && event.key === 'r') {
      event.preventDefault();
      this.refreshStatistics();
    }
  }
}

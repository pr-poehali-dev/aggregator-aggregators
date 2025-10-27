import { useState } from 'react';
import { Card } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Checkbox } from '@/components/ui/checkbox';
import { Slider } from '@/components/ui/slider';
import Icon from '@/components/ui/icon';

interface Aggregator {
  id: number;
  name: string;
  category: string;
  rating: number;
  features: string[];
  description: string;
  priceRange: string;
  logo: string;
}

const aggregators: Aggregator[] = [
  {
    id: 1,
    name: 'Яндекс.Маркет',
    category: 'Товары',
    rating: 4.8,
    features: ['Сравнение цен', 'Отзывы', 'Доставка', 'Кэшбэк'],
    description: 'Крупнейший агрегатор товаров с миллионами предложений',
    priceRange: 'Бесплатно',
    logo: '🛒'
  },
  {
    id: 2,
    name: 'Aviasales',
    category: 'Авиабилеты',
    rating: 4.9,
    features: ['Поиск билетов', 'Календарь цен', 'Подписка на цены', 'Страховки'],
    description: 'Поиск и сравнение авиабилетов по всем авиакомпаниям',
    priceRange: 'Бесплатно',
    logo: '✈️'
  },
  {
    id: 3,
    name: 'Booking.com',
    category: 'Отели',
    rating: 4.7,
    features: ['Бронирование', 'Отзывы', 'Гибкая отмена', 'Скидки'],
    description: 'Мировой лидер по бронированию отелей и жилья',
    priceRange: 'Бесплатно',
    logo: '🏨'
  },
  {
    id: 4,
    name: 'HeadHunter',
    category: 'Работа',
    rating: 4.6,
    features: ['Вакансии', 'Резюме', 'Отклики', 'Статистика'],
    description: 'Ведущий сайт по поиску работы и подбору персонала',
    priceRange: 'Бесплатно / Платно',
    logo: '💼'
  },
  {
    id: 5,
    name: 'Банки.ру',
    category: 'Финансы',
    rating: 4.5,
    features: ['Вклады', 'Кредиты', 'Карты', 'Ипотека'],
    description: 'Сравнение банковских продуктов и финансовых услуг',
    priceRange: 'Бесплатно',
    logo: '💰'
  },
  {
    id: 6,
    name: 'Яндекс.Еда',
    category: 'Доставка еды',
    rating: 4.4,
    features: ['Доставка', 'Рестораны', 'Промокоды', 'Трекинг'],
    description: 'Доставка еды из ресторанов и магазинов',
    priceRange: 'Бесплатно + Доставка',
    logo: '🍔'
  },
  {
    id: 7,
    name: 'Zoon',
    category: 'Услуги',
    rating: 4.3,
    features: ['Отзывы', 'Рейтинги', 'Контакты', 'Акции'],
    description: 'Поиск и выбор компаний по отзывам',
    priceRange: 'Бесплатно',
    logo: '⭐'
  },
  {
    id: 8,
    name: 'Яндекс.Недвижимость',
    category: 'Недвижимость',
    rating: 4.7,
    features: ['Аренда', 'Покупка', 'Карта', 'Фильтры'],
    description: 'Поиск квартир, домов и коммерческой недвижимости',
    priceRange: 'Бесплатно',
    logo: '🏠'
  }
];

const categories = ['Все', 'Товары', 'Авиабилеты', 'Отели', 'Работа', 'Финансы', 'Доставка еды', 'Услуги', 'Недвижимость'];

const Index = () => {
  const [selectedCategory, setSelectedCategory] = useState('Все');
  const [minRating, setMinRating] = useState([0]);
  const [selectedFeatures, setSelectedFeatures] = useState<string[]>([]);
  const [compareList, setCompareList] = useState<number[]>([]);

  const allFeatures = Array.from(new Set(aggregators.flatMap(a => a.features)));

  const filteredAggregators = aggregators.filter(agg => {
    const categoryMatch = selectedCategory === 'Все' || agg.category === selectedCategory;
    const ratingMatch = agg.rating >= minRating[0];
    const featuresMatch = selectedFeatures.length === 0 || 
      selectedFeatures.every(feature => agg.features.includes(feature));
    
    return categoryMatch && ratingMatch && featuresMatch;
  });

  const toggleCompare = (id: number) => {
    setCompareList(prev => 
      prev.includes(id) ? prev.filter(i => i !== id) : [...prev, id]
    );
  };

  const compareAggregators = aggregators.filter(a => compareList.includes(a.id));

  return (
    <div className="min-h-screen bg-background">
      <header className="border-b sticky top-0 bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60 z-50">
        <div className="container mx-auto px-4 py-6">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-3xl font-bold tracking-tight">Агрегатор Агрегаторов</h1>
              <p className="text-muted-foreground mt-1">Найдите лучший сервис для любой задачи</p>
            </div>
            {compareList.length > 0 && (
              <Button 
                onClick={() => document.getElementById('compare-section')?.scrollIntoView({ behavior: 'smooth' })}
                className="gap-2"
              >
                <Icon name="BarChart3" size={18} />
                Сравнить ({compareList.length})
              </Button>
            )}
          </div>
        </div>
      </header>

      <div className="container mx-auto px-4 py-8">
        <div className="grid lg:grid-cols-[280px_1fr] gap-8">
          <aside className="space-y-6 animate-fade-in">
            <Card className="p-6">
              <h3 className="font-semibold text-lg mb-4 flex items-center gap-2">
                <Icon name="Filter" size={20} />
                Фильтры
              </h3>
              
              <div className="space-y-6">
                <div>
                  <label className="text-sm font-medium mb-3 block">Категория</label>
                  <div className="space-y-2">
                    {categories.map(cat => (
                      <button
                        key={cat}
                        onClick={() => setSelectedCategory(cat)}
                        className={`w-full text-left px-3 py-2 rounded-lg text-sm transition-colors ${
                          selectedCategory === cat 
                            ? 'bg-primary text-primary-foreground font-medium' 
                            : 'hover:bg-muted'
                        }`}
                      >
                        {cat}
                      </button>
                    ))}
                  </div>
                </div>

                <div>
                  <label className="text-sm font-medium mb-3 block">
                    Рейтинг: {minRating[0].toFixed(1)}+
                  </label>
                  <Slider
                    value={minRating}
                    onValueChange={setMinRating}
                    min={0}
                    max={5}
                    step={0.1}
                    className="mt-2"
                  />
                </div>

                <div>
                  <label className="text-sm font-medium mb-3 block">Функциональность</label>
                  <div className="space-y-3">
                    {allFeatures.slice(0, 8).map(feature => (
                      <div key={feature} className="flex items-center space-x-2">
                        <Checkbox
                          id={feature}
                          checked={selectedFeatures.includes(feature)}
                          onCheckedChange={(checked) => {
                            setSelectedFeatures(prev =>
                              checked
                                ? [...prev, feature]
                                : prev.filter(f => f !== feature)
                            );
                          }}
                        />
                        <label
                          htmlFor={feature}
                          className="text-sm cursor-pointer leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                        >
                          {feature}
                        </label>
                      </div>
                    ))}
                  </div>
                </div>

                {(selectedCategory !== 'Все' || minRating[0] > 0 || selectedFeatures.length > 0) && (
                  <Button
                    variant="outline"
                    className="w-full"
                    onClick={() => {
                      setSelectedCategory('Все');
                      setMinRating([0]);
                      setSelectedFeatures([]);
                    }}
                  >
                    <Icon name="X" size={16} className="mr-2" />
                    Сбросить фильтры
                  </Button>
                )}
              </div>
            </Card>
          </aside>

          <main className="space-y-8">
            <div>
              <div className="flex items-center justify-between mb-6">
                <h2 className="text-2xl font-semibold">
                  Найдено: {filteredAggregators.length}
                </h2>
              </div>

              <div className="grid md:grid-cols-2 gap-6">
                {filteredAggregators.map((agg, index) => (
                  <Card 
                    key={agg.id} 
                    className="p-6 hover:shadow-lg transition-all duration-300 animate-scale-in"
                    style={{ animationDelay: `${index * 50}ms` }}
                  >
                    <div className="flex items-start justify-between mb-4">
                      <div className="flex items-center gap-3">
                        <div className="text-4xl">{agg.logo}</div>
                        <div>
                          <h3 className="font-semibold text-lg">{agg.name}</h3>
                          <Badge variant="secondary" className="mt-1">{agg.category}</Badge>
                        </div>
                      </div>
                      <Checkbox
                        checked={compareList.includes(agg.id)}
                        onCheckedChange={() => toggleCompare(agg.id)}
                        aria-label="Добавить к сравнению"
                      />
                    </div>

                    <p className="text-sm text-muted-foreground mb-4">
                      {agg.description}
                    </p>

                    <div className="flex items-center gap-4 mb-4">
                      <div className="flex items-center gap-1">
                        <Icon name="Star" size={16} className="text-yellow-500 fill-yellow-500" />
                        <span className="font-medium">{agg.rating}</span>
                      </div>
                      <div className="text-sm text-muted-foreground">
                        {agg.priceRange}
                      </div>
                    </div>

                    <div className="flex flex-wrap gap-2">
                      {agg.features.map(feature => (
                        <Badge key={feature} variant="outline" className="text-xs">
                          {feature}
                        </Badge>
                      ))}
                    </div>
                  </Card>
                ))}
              </div>

              {filteredAggregators.length === 0 && (
                <div className="text-center py-16">
                  <Icon name="SearchX" size={64} className="mx-auto text-muted-foreground mb-4" />
                  <h3 className="text-xl font-semibold mb-2">Ничего не найдено</h3>
                  <p className="text-muted-foreground">Попробуйте изменить фильтры</p>
                </div>
              )}
            </div>

            {compareAggregators.length > 0 && (
              <div id="compare-section" className="scroll-mt-20">
                <Card className="p-6 animate-fade-in">
                  <div className="flex items-center justify-between mb-6">
                    <h2 className="text-2xl font-semibold flex items-center gap-2">
                      <Icon name="BarChart3" size={24} />
                      Сравнение агрегаторов
                    </h2>
                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={() => setCompareList([])}
                    >
                      <Icon name="X" size={16} className="mr-2" />
                      Очистить
                    </Button>
                  </div>

                  <div className="overflow-x-auto">
                    <table className="w-full">
                      <thead>
                        <tr className="border-b">
                          <th className="text-left py-3 px-4 font-semibold">Параметр</th>
                          {compareAggregators.map(agg => (
                            <th key={agg.id} className="text-left py-3 px-4 font-semibold min-w-[200px]">
                              <div className="flex items-center gap-2">
                                <span className="text-2xl">{agg.logo}</span>
                                {agg.name}
                              </div>
                            </th>
                          ))}
                        </tr>
                      </thead>
                      <tbody>
                        <tr className="border-b">
                          <td className="py-3 px-4 text-sm text-muted-foreground">Категория</td>
                          {compareAggregators.map(agg => (
                            <td key={agg.id} className="py-3 px-4">
                              <Badge variant="secondary">{agg.category}</Badge>
                            </td>
                          ))}
                        </tr>
                        <tr className="border-b">
                          <td className="py-3 px-4 text-sm text-muted-foreground">Рейтинг</td>
                          {compareAggregators.map(agg => (
                            <td key={agg.id} className="py-3 px-4">
                              <div className="flex items-center gap-1">
                                <Icon name="Star" size={16} className="text-yellow-500 fill-yellow-500" />
                                <span className="font-medium">{agg.rating}</span>
                              </div>
                            </td>
                          ))}
                        </tr>
                        <tr className="border-b">
                          <td className="py-3 px-4 text-sm text-muted-foreground">Цена</td>
                          {compareAggregators.map(agg => (
                            <td key={agg.id} className="py-3 px-4 text-sm">
                              {agg.priceRange}
                            </td>
                          ))}
                        </tr>
                        <tr>
                          <td className="py-3 px-4 text-sm text-muted-foreground">Функции</td>
                          {compareAggregators.map(agg => (
                            <td key={agg.id} className="py-3 px-4">
                              <div className="space-y-1">
                                {agg.features.map(feature => (
                                  <div key={feature} className="flex items-center gap-2 text-sm">
                                    <Icon name="Check" size={14} className="text-green-600" />
                                    {feature}
                                  </div>
                                ))}
                              </div>
                            </td>
                          ))}
                        </tr>
                      </tbody>
                    </table>
                  </div>
                </Card>
              </div>
            )}
          </main>
        </div>
      </div>
    </div>
  );
};

export default Index;
